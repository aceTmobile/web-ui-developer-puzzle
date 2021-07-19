import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements AfterViewInit, OnDestroy {
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  private subscription: Subscription =  new Subscription();

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngAfterViewInit(): void {
    this.bufferSearch();
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchTerm) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  bufferSearch(): void {
    const searchFormSubscription = this.searchForm
      .get('term')
      .valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
          this.searchBooks();
      });

      this.subscription.add(searchFormSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
