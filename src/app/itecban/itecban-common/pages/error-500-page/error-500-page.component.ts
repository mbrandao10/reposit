import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterHelperService } from 'onesait-core';


@Component({
  selector: 'app-error-500-page',
  templateUrl: './error-500-page.component.html'
})
export class Error500PageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  reloadApp() {
    this.router.navigate([RouterHelperService.getPathFromId('global-position-page')]);
  }

}
