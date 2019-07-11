import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class RefreshComponent implements OnDestroy {

   private routerSubscription: Subscription;

   constructor(private _router: Router) {

    this.routerSubscription = this._router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.initialize();
        }
      });

   }

   abstract initializeComponent();

   initialize() {
       this.initializeComponent();
   }

   ngOnDestroy(): void {
    if ( this.routerSubscription ) {
      this.routerSubscription.unsubscribe();
    }
  }

}
