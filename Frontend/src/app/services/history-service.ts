import { Injectable } from "@angular/core";
import { CharacterModel } from "../models/character-model";

export interface searchEntry {
  id: number;
  gender: string;
  status: string;
  type: string;
  species: string;
  textToSearch: string;
  resultsInResearch: number;
}

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  public searchHistory: searchEntry[] = [];

  constructor() {
    // Load history when service is created
    this.loadSearchHistory();
  }

 //Load search history from local memory (if exist)
  private loadSearchHistory(): void {
    const historyString = localStorage.getItem("searchHistory");
    if (historyString) {
      this.searchHistory = JSON.parse(historyString);
    }
  }

  //return search history 
  getSearchHistory(): searchEntry[] {
    return this.searchHistory;
  }

  //Add new entry to search history
  addSearchEntry(
    gender: string,
    status: string,
    type: string,
    species: string,
    textToSearch: string,
    resultsInResearch: number
  ) {
    //Create new search entry from input data
    const newEntry: searchEntry = {
      id: this.searchHistory.length + 1,
      gender: gender,
      status: status,
      type: type,
      species: species,
      textToSearch: textToSearch,
      resultsInResearch: resultsInResearch
    };

    //Add entry to history
    this.searchHistory.push(newEntry);

    //Save history to local memory
    localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
  }

  deleteEntry(id: number): void {
    //find entry by id and remove from array
    this.searchHistory = this.searchHistory.filter((e) => e.id !== id);
   //Update local stored array
    localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
  }

  clearSearchHistory() {
    if(confirm("The entire history will be deleted are you sure ?")){
    this.searchHistory = []; // Clear the array
    localStorage.removeItem("searchHistory"); //Clear the local memory
    }
  }
}
