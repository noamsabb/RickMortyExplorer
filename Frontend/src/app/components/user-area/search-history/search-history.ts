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

  private historyService = inject(HistoryService);
 @Output() close = new EventEmitter<void>();

  closeHistory(): void {
    this.close.emit();
  }
    get searchHistory(): searchEntry[] {
    return [...this.historyService.getSearchHistory()].reverse();;
  }

  deleteSearchHistory(){
    this.historyService.clearSearchHistory();
  }
}
