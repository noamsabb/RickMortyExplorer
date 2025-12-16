import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CharacterModel } from "../models/character-model";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CharacterService {
  private http = inject(HttpClient);

  //Get array of all Characters from server
  public async getAllCharacters(): Promise<CharacterModel[]> {
    const observable = this.http.get<CharacterModel[]>(environment.dataUrl);
    const characters = await firstValueFrom(observable);

    return characters;
  }


}
