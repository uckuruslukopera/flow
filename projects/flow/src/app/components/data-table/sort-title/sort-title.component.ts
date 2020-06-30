import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-title',
  templateUrl: './sort-title.component.html',
  styleUrls: ['./sort-title.component.scss']
})
export class SortTitleComponent implements OnInit {

  @Input() column: {
    displayName: string;
    propertyName: string;
  };

  @Input() isSortField: boolean;
  @Input() isAscending: boolean;
  @Output() sortChanged: EventEmitter<{ propertyName: string, isAscending: boolean }> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggle(e): void {
    this.isAscending = !this.isAscending;
    this.sortChanged.emit({
      propertyName: this.column.propertyName,
      isAscending: this.isAscending
    });

  }

}
