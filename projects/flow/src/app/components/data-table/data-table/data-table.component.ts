import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

export enum Type {
  Custom = 6,
  Date = 5,
  DateTime = 4,
  Currency = 3,
  Icon = 2,
  Number = 1,
  String = 0
}

export interface Column {
  displayName: string;
  propertyName: string;
  sort: boolean;
  type: Type;
  editable: boolean;
}

export interface DataTableSettings {
  columns: Array<Column>;
  data: Array<any>;
  searchField: string;
  searchPlaceholder: string;
  pageSizes: Array<{ displayName: string, value: number }>;
  currentPageSize: number;
  totalPages: number;
  currentPage: number;
  enableSearch: boolean;
  currentSort: Array<{ propertyName: string; isAscending: boolean }>;
}

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent implements OnInit {

  @Input() settings: DataTableSettings = {
    columns: [],
    data: [],
    searchField: "",
    searchPlaceholder: "Search",
    pageSizes: [{ displayName: "5", value: 5 },
    { displayName: "10", value: 10 },
    { displayName: "25", value: 25 },
    { displayName: "50", value: 50 },
    { displayName: "100", value: 100 }
    ],
    currentPageSize: 25,
    totalPages: 0,
    currentPage: 0,
    enableSearch: true,
    currentSort: []
  };

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() changePageSize: EventEmitter<number> = new EventEmitter();
  @Output() changePage: EventEmitter<number> = new EventEmitter();
  @Output() changeSort: EventEmitter<{ propertyName: string; isAscending: boolean }> = new EventEmitter();
  @Output() saveRecord: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }


  isSortField(propertyName): boolean {
    return this.settings.currentSort.some(s => s.propertyName === propertyName);
  }

  isAscending(propertyName): boolean {
    const i = this.settings.currentSort.findIndex(s => s.propertyName == propertyName);
    if (i > -1) {
      return this.settings.currentSort[i].isAscending;
    } else {
      return false;
    }

  }

  searchHandler(e): void {
    this.search.emit(e);
  }

  setPageSize(e) {
    this.changePageSize.emit(e);
  }

  setPage(e) {
    this.changePage.emit(e)
  }

  setSort(e) {
    this.changeSort.emit(e);
  }

  saveCell(record: any) {
    this.saveRecord.emit(record);
  }
}
