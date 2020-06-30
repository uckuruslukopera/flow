import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTableComponent } from "./data-table/data-table.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { FormsModule } from "@angular/forms";

import { ButtonModule } from "../../shared/button/button.module";
import { InputModule } from "../../shared/input/input.module";
import { SortTitleComponent } from './sort-title/sort-title.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { TableCellComponent } from './table-cell/table-cell.component';


@NgModule({
  declarations: [DataTableComponent, PaginationComponent, SortTitleComponent, SearchInputComponent, TableCellComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    FormsModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
