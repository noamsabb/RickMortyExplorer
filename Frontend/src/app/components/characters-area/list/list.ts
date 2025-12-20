import { Component, inject, OnInit } from "@angular/core";
import { CharacterModel } from "../../../models/character-model";
import { CharacterService } from "../../../services/character-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CharacterCard } from "../character-card/character-card";
import { HistoryService, searchEntry } from "../../../services/history-service";
import { SearchHistory } from "../../user-area/search-history/search-history";

@Component({
  selector: "app-list",
  imports: [FormsModule, CharacterCard, SearchHistory, CommonModule],
  templateUrl: "./list.html",
  styleUrl: "./list.css",
})
export class List implements OnInit {
  private characterService = inject(CharacterService);
  private historyService = inject(HistoryService);

  public allCharacters: CharacterModel[] = [];
  public charactersToDisplay: CharacterModel[] = [];
  public filteredCharacters: CharacterModel[] = [];
  public filter: string = "";
  public selectedStatus: string = "";
  public selectedGender: string = "";
  public selectedType: string = "";
  public selectedSpecies: string = "";
  public textToSearch: string = "";
  public species: string[] = [];
  public types: string[] = [];
  private searchTimeout: any = null;
  public showHistory: boolean = false;

  public async ngOnInit(): Promise<void> {
    try {
      const cachedCharacters = localStorage.getItem("allCharacters");

      if (cachedCharacters) {
        // Load from cache
        this.allCharacters = JSON.parse(cachedCharacters);
      } else {
        // Load from API
        this.allCharacters = await this.characterService.getAllCharacters();
        localStorage.setItem(
          "allCharacters",
          JSON.stringify(this.allCharacters)
        );
      }

      this.charactersToDisplay = this.allCharacters;
      this.getSpecies();
      this.getTypes();
    } catch (err: any) {
      alert(err.message);
    }
  }

  //Create list of all different species for filter
  getSpecies() {
    this.species = Array.from(
      new Set(
        this.allCharacters.map((c) => c.species ?? "").filter((s) => s !== "")
      )
    );
  }
  //Create list of all different types for filter
  getTypes() {
    this.types = Array.from(
      new Set(
        this.allCharacters.map((c) => c.type ?? "").filter((t) => t !== "")
      )
    );
  }

  filterCharacters() {
    this.charactersToDisplay = this.allCharacters.filter((c) => {
      //Check Filters
      const matchesGender =
        !this.selectedGender || c.gender === this.selectedGender;
      const matchesStatus =
        !this.selectedStatus || c.status === this.selectedStatus;
      const matchesType = !this.selectedType || c.type === this.selectedType;
      const matchesSpecies =
        !this.selectedSpecies || c.species === this.selectedSpecies;

      //Search Engine:
      const matchesName =
        !this.textToSearch.trim() ||
        c.name.toLowerCase().includes(this.textToSearch.trim().toLowerCase());

      return (
        matchesGender &&
        matchesStatus &&
        matchesType &&
        matchesSpecies &&
        matchesName
      );
    });

      if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    //Add search entry to search history
    // Wait 5 seconds before adding entry to searchHistory to avoid not finished entries
    this.searchTimeout = setTimeout(() => {
      this.addToHistory();
    }, 2000); // 2 second delay
  }

   private addToHistory(): void {
    this.historyService.addSearchEntry(
      this.selectedGender,
      this.selectedStatus,
      this.selectedType,
      this.selectedSpecies,
      this.textToSearch
    );
  }

  resetFilters() {
     // Clear timeout when resetting filters
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.selectedGender = "";
    this.selectedStatus = "";
    this.selectedType = "";
    this.selectedSpecies = "";
    this.textToSearch = "";
    this.charactersToDisplay = this.allCharacters;
  }

    toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  loadHistoryEntry(entry: searchEntry): void {
  // Apply the filters from history
  this.selectedGender = entry.gender;
  this.selectedStatus = entry.status;
  this.selectedType = entry.type;
  this.selectedSpecies = entry.species;
  this.textToSearch = entry.textToSearch;
  
  // Re-run the filter
  this.filterCharacters();
  
  // Close the panel
  this.showHistory = false;
}
}
