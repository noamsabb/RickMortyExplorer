import { Component, EventEmitter, inject, Output } from '@angular/core';
import { HistoryService, searchEntry } from '../../../services/history-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-history',
  imports: [CommonModule],
  templateUrl: './search-history.html',
  styleUrl: './search-history.css'
})
export class SearchHistory {
  //Dependencies injection
  private historyService = inject(HistoryService);

//Send close command to parent component (list)
 @Output() close = new EventEmitter<void>();
  closeHistory(): void {
    this.close.emit();
  }
  
  //Get search history entries in reverse order (newest first)
  get searchHistory(): searchEntry[] {
    return [...this.historyService.getSearchHistory()].reverse();
  }

  //Clear all search history from service and local storage
  deleteSearchHistory(){
    this.historyService.clearSearchHistory();
  }

  //Delete a single entry from search history
  deleteEntry(id: number): void {
    this.historyService.deleteEntry(id);
  }
}
