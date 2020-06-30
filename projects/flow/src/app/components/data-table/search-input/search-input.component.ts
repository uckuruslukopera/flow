import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() placeholder: string;
  @Output() inputChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  searchHandler(e) {
    if (e && e.queryText && e.queryText.length && e.queryText.length > 2) {
      this.inputChanged.emit(String(e.queryText).trim().toLowerCase());
    } else {
      this.inputChanged.emit("");
    }
  }

}
