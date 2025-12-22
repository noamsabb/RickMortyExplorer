import { Component, HostListener, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CharacterModel } from '../../../models/character-model';
import { CharacterDetails } from "../character-details/character-details";
import { CommonModule } from '@angular/common';
import { Favorites } from '../../user-area/favorites/favorites';
import { FavoriteService } from '../../../services/favorite-service';


@Component({
  selector: 'app-character-card',
  imports: [CharacterDetails,CommonModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css'
})



export class CharacterCard implements OnInit, OnChanges {

  //Get character from list
  @Input()
  public character!: CharacterModel;

  //Get access to favorite functionality
  private favoritesService = inject(FavoriteService);
  public isFavoriteFlag: boolean = false;

  ngOnInit(): void {
    this.updateFavoriteStatus();
  }

  //Update favorite status when character input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character']) {
      this.updateFavoriteStatus();
    }
  }

  //Check if character is favorite and update flag
  private updateFavoriteStatus(): void {
    this.isFavoriteFlag = this.favoritesService.isFavorite(this.character.id);
  }

  //If favorite button is clicked
  clickFavorite(): void {
    this.favoritesService.clickFavorite(this.character);
    this.updateFavoriteStatus(); 
  }

  public moreInfoFlag: boolean = false;
  
//Close more info modal when user click out of it 
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.moreInfo-modal') && !target.closest('button')) {
      this.moreInfoFlag = false;
    }
  }

}
