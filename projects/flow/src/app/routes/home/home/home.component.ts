import { Component, OnInit, OnDestroy } from '@angular/core';
import { AthleteService } from '../../../services/athlete.service';
import { DataTableSettings, Type } from '../../../components/data-table/data-table/data-table.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  dataTableSettings: DataTableSettings = {
    columns: [
      {
        displayName: "Position",
        propertyName: "Position",
        sort: true,
        type: Type.Icon,
        editable: false
      },
      {
        displayName: "Id",
        propertyName: "Id",
        sort: true,
        type: Type.Number,
        editable: false
      },
      {
        displayName: "Name",
        propertyName: "Name",
        sort: true,
        type: Type.String,
        editable: true
      },
      {
        displayName: "BPM",
        propertyName: "BeatsPerMinute",
        sort: true,
        type: Type.Number,
        editable: true
      },
      {
        displayName: "Registered",
        propertyName: "Registered",
        sort: false,
        type: Type.DateTime,
        editable: false
      },
      {
        displayName: "Country",
        propertyName: "CountryName",
        sort: true,
        type: Type.Custom,
        editable: true
      },
    ],
    searchField: "Name",
    searchPlaceholder: "Enter the first 3 letters of athlete's name",
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

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public athleteService: AthleteService) {
    this.athleteService.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.dataTableSettings.totalPages = params.totalPages;
      this.dataTableSettings.currentPage = params.page;
      this.dataTableSettings.currentPageSize = params.pageSize;
      this.dataTableSettings.currentSort = params.sort.map(s => {
        return { propertyName: s.field, isAscending: s.method === "ascending" }
      });

    });
  }

  ngOnInit(): void {
    this.athleteService.getAthletes();
  }

  searchHandler(queryText): void {
    this.athleteService.setCursor(this.dataTableSettings.searchField);
    this.athleteService.setSearch(queryText);
    this.athleteService.getAthletes();
  }

  pageSizeChangeHandler(pageSize): void {
    this.athleteService.setPageSize(pageSize);
    this.athleteService.getAthletes();
  }

  pageChangeHandler(page): void {
    this.athleteService.setPage(page);
    this.athleteService.getAthletes();
  }

  sortChangeHandler(e): void {
    this.athleteService.setSort([{
      field: e.propertyName,
      method: e.isAscending ? "ascending" : "descending"
    }]);
    this.athleteService.getAthletes();
  }

  update(record): void {
    this.athleteService.updateAthleteRecord(record);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
