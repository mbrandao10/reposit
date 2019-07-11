import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-error-session-page',
  templateUrl: './error-session-page.component.html'
})
export class ErrorSessionPageComponent implements OnInit, OnDestroy {

  private paramsObservable: any;
  errorMessage: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsObservable = this.route.params.subscribe(params => {
      if (params['error']) {
        this.errorMessage = params['error'];
      }
    });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    if (this.paramsObservable) {
        this.paramsObservable.unsubscribe();
    }
  }

}
