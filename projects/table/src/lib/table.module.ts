import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [TableComponent, SearchInputComponent, ButtonComponent],
  imports: [
  ],
  exports: [TableComponent]
})
export class TableModule { }
