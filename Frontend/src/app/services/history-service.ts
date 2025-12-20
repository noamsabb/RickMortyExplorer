import { Injectable } from "@angular/core";
import { CharacterModel } from "../models/character-model";

export interface searchEntry {
  id: number;
  gender: string;
  status: string;
  type: string;
  species: string;
  textToSearch: string;
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

  private loadSearchHistory(): void {
    const historyString = localStorage.getItem("searchHistory");
    if (historyString) {
      this.searchHistory = JSON.parse(historyString);
    }
  }

  getSearchHistory(): searchEntry[] {
    return this.searchHistory;
  }

  addSearchEntry(
    gender: string,
    status: string,
    type: string,
    species: string,
    textToSearch: string
  ) {
    const newEntry: searchEntry = {
      id: this.searchHistory.length + 1,
      gender: gender,
      status: status,
      type: type,
      species: species,
      textToSearch: textToSearch,
    };
    this.searchHistory.push(newEntry);
    localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    console.log(this.searchHistory);
  }

  deleteEntry(id: number): void {
    this.searchHistory = this.searchHistory.filter((e) => e.id !== id);
    localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
  }

  clearSearchHistory() {
    if(confirm("The entire history will be deleted are you sure ?")){
    this.searchHistory = []; // Clear the array
    localStorage.removeItem("searchHistory");
    }
  }
}
