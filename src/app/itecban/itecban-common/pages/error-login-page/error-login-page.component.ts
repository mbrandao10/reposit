import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterHelperService } from 'onesait-core';

@Component({
  selector: 'app-error-login-page',
  templateUrl: './error-login-page.component.html'
})
export class ErrorLoginPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  reloadApp() {
    this.router.navigate([RouterHelperService.getPathFromId('login-page')]);
  }

}
