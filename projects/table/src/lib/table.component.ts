import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() settings = {
    'primary-color': 'black',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
