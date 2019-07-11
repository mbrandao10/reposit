import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html'
})
export class InputSearchComponent implements OnInit {

	@Input() getter: any;

  items: Observable<Array<string>>;
  control = new FormControl();

  constructor() {}

  ngOnInit() {
    this.items = this.control.valueChanges
    .pipe( debounceTime(400))
      .pipe( distinctUntilChanged())
      .pipe( switchMap(valueInput => this.searchPer(valueInput)));


  }

  searchPer (valueInput: string) {
      return this.getter(valueInput).map((request) => request.data);
    }

}
