import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterHelperService } from 'onesait-core';

@Component({
  selector: 'app-in-progress-page',
  templateUrl: './in-progress-page.component.html'
})
export class InProgressPageComponent implements OnInit {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate([RouterHelperService.getPathFromId('home-page')]);
  }

}
