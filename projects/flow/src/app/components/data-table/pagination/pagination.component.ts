import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  availablePages: Array<number> = [];

  @Input() pageSizes: Array<number>;
  @Input() currentPageSize: number;
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["totalPages"]) {
      this.availablePages = [...Array(this.totalPages).keys()]
    }
  }

  ngOnInit(): void {
  }

  setPage(e): void {
    this.pageChanged.emit(e);
  }

  changePageSize(e): void {
    this.pageSizeChanged.emit(e);
  }

}
