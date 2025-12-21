import { Component, inject } from "@angular/core";
import { CharacterModel } from "../../../models/character-model";
import { FavoriteService } from "../../../services/favorite-service";
import { CharacterCard } from "../../characters-area/character-card/character-card";

@Component({
  selector: "app-favorites",
  imports: [CharacterCard],
  templateUrl: "./favorites.html",
  styleUrl: "./favorites.css",
})
export class Favorites {
  //Dependency injection
  private favoriteService = inject(FavoriteService);

  //Get favorite characters from Favorite service
  get favoritesCharacters(): CharacterModel[] {
    return this.favoriteService.getFavorites();
  }

  deleteFavorites(){
    if(confirm("All of your favorites will be deleted. Are you Sure ? "))
    this.favoriteService.deleteAllFavorites();
  }
}
