import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, markAsRead, resetMarkAsRead } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store
  ) { }

  removeFromReadingList(item): void {
    this.store.dispatch(removeFromReadingList({ item }));
    this.store.dispatch(resetMarkAsRead({ item: {...item, finished: false, finishedDate: null} }));
  }

  markAsRead(item): void {
    this.store.dispatch(markAsRead({ item: {...item, finished: true, finishedDate: new Date().toISOString()} }));
  }
}
