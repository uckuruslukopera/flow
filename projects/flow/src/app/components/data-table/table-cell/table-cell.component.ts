import { Component, OnInit, Input, Output, EventEmitter, Type } from '@angular/core';
import { Column } from '../data-table/data-table.component';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {


  type = Type;

  @Input() record: any;
  @Input() column: Column;

  @Output() editStarted: EventEmitter<boolean> = new EventEmitter();
  @Output() editFinished: EventEmitter<any> = new EventEmitter();

  newCellValue: any;
  editMode: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getValue(obj, propertyName): any {
    return obj[propertyName];
  }

  prepareForSave(e): void {
    this.record[this.column.propertyName] = this.newCellValue;
    this.editFinished.emit(this.record);
    this.editMode = false;
  }

  prepareForEdit(e): void {
    this.newCellValue = this.getValue(this.record, this.column.propertyName);
    this.editMode = true;
  }

}
