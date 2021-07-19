import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTotalUnread } from '@tmo/books/data-access';
import { SelectorQuery, SelectorType, setAriaLabel } from '@tmo/shared/utils-accessibility';
@Component({
  selector: 'tmo-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss']
})
export class TotalCountComponent implements OnInit, AfterViewChecked {
  totalUnread$ = this.store.select(getTotalUnread);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
  
  ngAfterViewChecked(): void {
    this.configureAccessibility()
  }

  configureAccessibility() {
    const selectorQuery = {} as SelectorQuery;
    selectorQuery.selector = "mat-badge-content-0";
    selectorQuery.type = SelectorType.id;
    selectorQuery.ariaLabelValue = "the reading list total count";

    setAriaLabel(selectorQuery);
  }
}
