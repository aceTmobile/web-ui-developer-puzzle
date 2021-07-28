import { Component, AfterViewChecked, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTotalUnread } from '@tmo/books/data-access';
@Component({
  selector: 'tmo-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss']
})
export class TotalCountComponent implements AfterViewChecked {
  totalUnread$ = this.store.select(getTotalUnread);

  constructor(private readonly store: Store, private element: ElementRef) {}
  
  ngAfterViewChecked(): void {
    this.configureAccessibility();
  }

  configureAccessibility(): void {
    const elem = this.element.nativeElement.querySelector('#mat-badge-content-0');
    if (elem) {
      elem.setAttribute('aria-label', 'the reading list total count');
    }
  }
}
