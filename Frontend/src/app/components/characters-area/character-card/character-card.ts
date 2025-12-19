import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { CharacterModel } from '../../../models/character-model';
import { CharacterDetails } from "../character-details/character-details";
import { CommonModule } from '@angular/common';
import { Favorites } from '../favorites/favorites';
import { FavoriteService } from '../../../services/favorite-service';


@Component({
  selector: 'app-character-card',
  imports: [CharacterDetails,CommonModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css'
})



export class CharacterCard implements OnInit {

  @Input()
  public character!: CharacterModel;

  private favoritesService = inject(FavoriteService);
  public isFavoriteFlag: boolean = false;

  ngOnInit(): void {
    this.updateFavoriteStatus();
  }

  private updateFavoriteStatus(): void {
    this.isFavoriteFlag = this.favoritesService.isFavorite(this.character.id);
  }

  clickFavorite(): void {
    this.favoritesService.clickFavorite(this.character);
    this.updateFavoriteStatus(); 
  }
  public moreInfoFlag: boolean = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.moreInfo-modal') && !target.closest('button')) {
      this.moreInfoFlag = false;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.moreInfoFlag = false;
  }

}
