import { Component, HostListener, Input } from '@angular/core';
import { CharacterModel } from '../../../models/character-model';
import { CharacterDetails } from "../character-details/character-details";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-character-card',
  imports: [CharacterDetails,CommonModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css'
})



export class CharacterCard {

  @Input()
  public character!: CharacterModel;

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
