import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { TypedAction } from '@ngrx/store/src/models';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { Book, ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$: Observable<({ list: ReadingListItem[] } | ({ error: string; } & TypedAction<string>))> 
  = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>("/api/reading-list/").pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$: Observable<({ book: Book } & TypedAction<string>)> 
  = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post("/api/reading-list/", book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$: Observable<({ item: ReadingListItem } & TypedAction<string>)> 
  = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  bookAddedSnackBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      tap( ({book}) => {
        const snackBarRef = this.snackBar.open("Book added", "Undo", {
          duration: 5000
        });
        snackBarRef.onAction().subscribe(() => {
          const item: ReadingListItem = { bookId: book.id, ...book };
          this.store$.dispatch(ReadingListActions.removeFromReadingList({ item }));
        });
      })
    ),
    { dispatch: false }
  );
  bookRemovedSnackBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      tap(({ item }) => {
        const snackBarRef = this.snackBar.open("Book removed", "Undo", {
          duration: 5000
        });
        snackBarRef.onAction().subscribe(() => {
          const book: Book = { id: item.bookId, ...item };
          this.store$.dispatch(ReadingListActions.addToReadingList({ book }));
        });
      })
    ),
    { dispatch: false }
  );
  
  markAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.markAsRead),
      concatMap(({ item }) =>
        this.http.put(`/api/reading-list/${item.bookId}/finished`, item).pipe(
          map(() => 
            ReadingListActions.confirmedMarkAsRead({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedMarkAsRead({ item }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects(): TypedAction<string> {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient, private store$: Store, private snackBar: MatSnackBar) {}
}
