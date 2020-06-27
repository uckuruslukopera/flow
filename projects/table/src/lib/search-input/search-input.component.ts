import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() settings = {
    'primary-color': 'black',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
