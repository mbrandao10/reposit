import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService, RouterHelperService } from 'onesait-core';
import { constants } from 'onesait-core';

@Component({
  selector: 'app-first-access-page',
  templateUrl: './first-access-page.component.html'
})
export class FirstAccessComponent implements OnInit {

  user: any;

  constructor(
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.utilsService.getUser();
  }

  fisrtAccessComplete() {
    this.utilsService.setItemLocalStorage(constants.FIRST_ACCESS_KEY, new Date().getTime());
    this.goHome();
  }

  goHome() {
    this.router.navigate([RouterHelperService.getPathFromId('global-position-page')]);
  }

}
