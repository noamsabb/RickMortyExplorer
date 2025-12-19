import { Component, inject } from "@angular/core";
import { CharacterModel } from "../../../models/character-model";
import { FavoriteService } from "../../../services/favorite-service";
import { CharacterCard } from "../character-card/character-card";

@Component({
  selector: "app-favorites",
  imports: [CharacterCard],
  templateUrl: "./favorites.html",
  styleUrl: "./favorites.css",
})
export class Favorites {
  private favoriteService = inject(FavoriteService);
  get favoritesCharacters(): CharacterModel[] {
    return this.favoriteService.getFavorites();
  }

//TODO: Delete
  showFavorites(){
    console.log(this.favoritesCharacters);
    
  }

  deleteFavorites(){
    this.favoriteService.deleteAllFavorites();
  }
}
