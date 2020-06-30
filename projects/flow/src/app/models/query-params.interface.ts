export interface QueryParams {
    pageSize: number;
    cursor: string; // searchBy
    search: string; //query
    sort: Array<{ field: string; method: string }>;
    filter: Array<{ field: string; method: string; parameters: string | Array<number> }>;

    page: number;
    totalPages: number;
    totalElements: number;
}