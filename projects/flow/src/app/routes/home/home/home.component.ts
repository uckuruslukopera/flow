import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../../../services/athlete.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataTableSettings = {
    columns: [
      {
        displayName: "Position",
        propertyName: "Position",
        sort: true
      },
      {
        displayName: "Id",
        propertyName: "Id",
        sort: true
      },
      {
        displayName: "Name",
        propertyName: "Name",
        sort: true
      },
      {
        displayName: "BPM",
        propertyName: "BeatsPerMinute",
        sort: true
      },
      {
        displayName: "Registered",
        propertyName: "Registered",
        sort: false
      },
      {
        displayName: "Country",
        propertyName: "CountryName",
        sort: true
      },
    ],
    data: [],
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


  constructor(private athleteService: AthleteService) {
    this.athleteService.athletes.subscribe(response => this.dataTableSettings.data = response);
    this.athleteService.queryParams.subscribe(params => {
      this.dataTableSettings.totalPages = params.totalPages;
      this.dataTableSettings.currentPage = params.page;
      this.dataTableSettings.currentPageSize = params.pageSize;
      this.dataTableSettings.currentSort = params.sort.map(s => { return { propertyName: s.field, isAscending: s.method === "ascending" } });

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
    console.log(pageSize);
    this.athleteService.setPageSize(pageSize);
    this.athleteService.getAthletes();
  }

  pageChangeHandler(page): void {
    this.athleteService.setPage(page);
    this.athleteService.getAthletes();
  }

  sortChangeHandler(e) {
    this.athleteService.setSort([{
      field: e.propertyName,
      method: e.isAscending ? "ascending" : "descending"
    }]);
    this.athleteService.getAthletes();
  }

  update(record) {
    this.athleteService.updateAthleteRecord(record);
  }

}
