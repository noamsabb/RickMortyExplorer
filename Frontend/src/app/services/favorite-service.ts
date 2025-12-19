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

  private loadFavorites(): void {
    const favoritesString = localStorage.getItem("favoritesCharacters");
    if (favoritesString) {
      this.favoriteCharacters = JSON.parse(favoritesString);
    }
  }

  getFavorites(): CharacterModel[] {
    return this.favoriteCharacters;
  }

  isFavorite(characterId: number): boolean {
    const result = this.favoriteCharacters.some((f) => f.id === characterId);
    return result;
  }

  addFavorite(character: CharacterModel) {
    console.log(character.name);
    if (this.isFavorite(character.id)) {
      return;
    }
    // Create new array reference to trigger change detection
    this.favoriteCharacters = [...this.favoriteCharacters, character];
    localStorage.setItem(
      "favoritesCharacters",
      JSON.stringify(this.favoriteCharacters)
    );
  }

  deleteFavorite(character: CharacterModel) {
    console.log(character.name);
    this.favoriteCharacters = this.favoriteCharacters.filter(
      (f) => f.id !== character.id
    );
    localStorage.setItem("favoritesCharacters", JSON.stringify(this.favoriteCharacters));
  }

  clickFavorite(character: CharacterModel):void{
    if(this.isFavorite(character.id)){
      this.deleteFavorite(character)
    }
    else{
      this.addFavorite(character)
    }
  }

  deleteAllFavorites(){
    this.favoriteCharacters = []; // Clear the array
    localStorage.removeItem('favoritesCharacters');
  }

}
