import { Component, OnChanges, Input } from '@angular/core';
import { HeaderTitle } from '../../../models/classes/header';

@Component({
  selector: 'osb-header-title',
  templateUrl: './header-title.component.html'
})
export class HeaderTitleComponent implements OnChanges {

  @Input()
  headerTitle: HeaderTitle;

  titleMobile: any;

  constructor() {}

  ngOnChanges() {
    if (this.headerTitle) {
      if ( this.headerTitle.level3 ) {
        this.titleMobile = this.headerTitle.level3;
      } else if ( this.headerTitle.level2 ) {
        this.titleMobile = this.headerTitle.level2;
      } else {
        this.titleMobile = this.headerTitle.level1;
      }
    }

  }

}
