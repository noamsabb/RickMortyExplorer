import { Component, Input } from '@angular/core';
import { CharacterModel } from '../../../models/character-model';

@Component({
  selector: 'app-character-details',
  imports: [],
  templateUrl: './character-details.html',
  styleUrl: './character-details.css'
})
export class CharacterDetails {

    @Input()
  public character!: CharacterModel;
  
}
