import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

  @Input()
  isPageLoader = true;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
