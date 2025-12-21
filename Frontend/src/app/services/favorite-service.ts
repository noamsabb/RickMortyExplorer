import { Injectable } from "@angular/core";
import { CharacterModel } from "../models/character-model";


@Injectable({
  providedIn: "root",
})
export class FavoriteService {
 public favoriteCharacters: CharacterModel[] = [];

  constructor() {
    // Load favorites when service is created
    this.loadFavorites();
  }

 //Load favorites from local memory (if exist)
  private loadFavorites(): void {
    const favoritesString = localStorage.getItem("favoritesCharacters");
    if (favoritesString) {
      this.favoriteCharacters = JSON.parse(favoritesString);
    }
  }

  //return favorite list
  getFavorites(): CharacterModel[] {
    return this.favoriteCharacters;
  }

  //Check if character is favorite looking for id in favorite list
  isFavorite(characterId: number): boolean {
    const result = this.favoriteCharacters.some((f) => f.id === characterId);
    return result;
  }

  //Add character to favorite list
  addFavorite(character: CharacterModel) {
    if (this.isFavorite(character.id)) {
      return;
    }
    // Create new array reference to trigger change detection
    this.favoriteCharacters = [...this.favoriteCharacters, character];
    
    //Save new list to local memory
    localStorage.setItem(
      "favoritesCharacters",
      JSON.stringify(this.favoriteCharacters)
    );
  }

  deleteFavorite(character: CharacterModel) {
    //Find character by id and delete it from list
    this.favoriteCharacters = this.favoriteCharacters.filter(
      (f) => f.id !== character.id
    );
    
    //Update local stored list
    localStorage.setItem("favoritesCharacters", JSON.stringify(this.favoriteCharacters));
  }

  //Click on favorite button will add or delete character from list
  clickFavorite(character: CharacterModel):void{
    if(this.isFavorite(character.id)){
      this.deleteFavorite(character)
    }
    else{
      this.addFavorite(character)
    }
  }

  //Empty favorite list and clear local memory
  deleteAllFavorites(){
    this.favoriteCharacters = []; // Clear the array
    localStorage.removeItem('favoritesCharacters');
  }

}
