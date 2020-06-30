import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Athlete } from "../models/athlete.interface";
import { QueryParams } from "../models/query-params.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class AthleteService extends BaseService {

  private athletes$: BehaviorSubject<Athlete[]> = new BehaviorSubject([]);
  public readonly athletes: Observable<Athlete[]> = this.athletes$.asObservable();

  private queryParams$: BehaviorSubject<QueryParams> = new BehaviorSubject({
    pageSize: 25, // TODO: get from environment -- MT
    cursor: "",
    search: "",
    sort: [{ field: "CountryName", method: "ascending" }],
    filter: [],
    page: 0,
    totalPages: 8,
    totalElements: 185
  });
  queryParams = this.queryParams$.asObservable();

  constructor(protected http: HttpClient) {
    super(http, "athletes.json");
  }

  getAthletes(): void {

    this.get<Athlete[]>(this.prepareQueryParams()).pipe(
      tap(response => {
        this.queryParams$.next(
          // Production Version:
          // response['queryParams']
          // Mock Version:
          {
            ...this.queryParams$.value,
            totalPages: Math.ceil(response["content"].length / this.queryParams$.value.pageSize),
            totalElements: response["content"].length
          }
        );
      }

      ),
      map(response => this.prepareforSearch(response["content"])),
      map(response => this.prepareforSort(response)),
      map(response => this.prepareForPagination(response))
    ).subscribe(
      response => {
        this.athletes$.next(response);
      }
    );
  }

  updateAthleteRecord(resource) {
    // Production
    // this.put(resource).subscribe(response => {
    //   this.athletes$.next(response);
    // });

  }

  setPage(page: number): void {
    this.queryParams$.next({
      ...this.queryParams$.value,
      ...{
        page
      }
    });
  }

  setPageSize(pageSize: number): void {
    let page = this.queryParams$.value.page;
    if (pageSize * (page + 1) > this.queryParams$.value.totalElements) {
      page = Math.floor(this.queryParams$.value.totalElements / pageSize);
    }

    this.queryParams$.next({
      ...this.queryParams$.value,
      ...{
        pageSize,
        page
      }
    });
  }

  setSearch(search: string): void {
    this.queryParams$.next({
      ...this.queryParams$.value,
      ...{
        search
      }
    });
  }

  setCursor(cursor: string): void {
    this.queryParams$.next({
      ...this.queryParams$.value,
      ...{
        cursor
      }
    });
  }

  setSort(sort) {
    this.queryParams$.next({
      ...this.queryParams$.value,
      ...{
        sort
      }
    });
  }



  // setSortBy(sortBy: string) {
  //   this.queryParams$.next({
  //     ...this.queryParams$.value,
  //     ...{
  //       sortBy
  //     }
  //   });
  // }

  // setSortDir(sortDir: string) {
  //   this.queryParams$.next({
  //     ...this.queryParams$.value,
  //     ...{
  //       sortDir
  //     }
  //   });
  // }

  private prepareQueryParams(): HttpParams {

    let queryParams = new HttpParams();

    queryParams = queryParams.set(
      "page",
      this.queryParams$.value.page.toString()
    );
    queryParams = queryParams.set(
      "pageSize",
      this.queryParams$.value.pageSize.toString()
    );
    if (this.queryParams$.value.search) {
      queryParams = queryParams.set(
        "search",
        this.queryParams$.value.search
      );
      queryParams = queryParams.set(
        "cursor",
        this.queryParams$.value.cursor
      );
    }
    if (this.queryParams$.value.sort && this.queryParams$.value.sort) {
      // TODO: add array to string method
      // const sortStr = this.queryParams$.value.sort.reduce((curr, acc) => acc)
      // queryParams = queryParams.set(
      //   "sort",
      //   `[${sortStr}]`
      // );
    }
    if (this.queryParams$.value.filter && this.queryParams$.value.filter) {
      // TODO: add array to string method
      // const filterStr = this.queryParams$.value.sort.reduce((curr, acc) => acc)
      // queryParams = queryParams.set(
      //   "sort",
      //   `[${filterStr}]`
      // );
    }
    return queryParams;
  }

  private prepareForPagination(data): Athlete[] {
    if (data && data.length > Number(this.queryParams$.value.pageSize)) {
      const startIndex = (this.queryParams$.value.page) * Number(this.queryParams$.value.pageSize);
      const endIndex = startIndex + Number(this.queryParams$.value.pageSize);
      return data.slice(startIndex, endIndex);
    } else {
      return data;
    }
  }

  private prepareforSearch(data): Athlete[] {
    const query = this.queryParams$.value.search;
    const by = this.queryParams$.value.cursor;
    return data.filter(record => String(record[by]).toLowerCase().includes(query));
  }

  private prepareforSort(data) {
    if (this.queryParams$.value.sort && this.queryParams$.value.sort.length) {
      const sortBy = this.queryParams$.value.sort[0].field; //TODO: change for multiple sortby values -- MT
      const sortDir = this.queryParams$.value.sort[0].method;

      if (sortDir === "ascending") {
        return data.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
      } else {
        return data.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0));
      }
    }

  }
}

