import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { AppConfigService } from '../app-config-service/app-config.service';

export enum GridType {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

@Injectable()
export class DeviceUtilsService implements OnDestroy {

  private mobileResolution = false;
  private tabletResolution = false;
  private dektopResolution = false;
  private largeDektopResolution = false;

  private notifyChangeScreen$: BehaviorSubject<any>;
  private controlSourceSize$: Subscription;
  private controlSourceSizePixel$: Subscription;
  private notifyChangeScreenPixel$: BehaviorSubject<any>;
  private currentResolutionPixel: any;

  private currentResolution: string;

  private gridSizes: any;

  constructor(
    private appConfigService: AppConfigService
  ) {
    this.gridSizes = this.appConfigService.getConfig('grid.sizes');
    let stateInitial: string = this.calculateDimension(window.innerWidth);
    this.notifyChangeScreen$ = new BehaviorSubject<string>(stateInitial);
    this.currentResolution = stateInitial;

    this.controlSourceSize$ = fromEvent(window, 'resize')
    .pipe(debounceTime(100),
    distinctUntilChanged(),
    map(() => { return this.calculateDimension(window.innerWidth); }),
    filter((state) => state !== this.currentResolution))
    .subscribe((state: string) => {
      this.currentResolution = state;
      if (!this.notifyChangeScreen$) {
        this.notifyChangeScreen$ = new BehaviorSubject<string>(state);
      } else {
        this.notifyChangeScreen$.next(state);
      }
    });

    this.notifyChangeScreenPixel$ = new BehaviorSubject<string>(stateInitial);
    this.currentResolutionPixel = stateInitial;
    this.controlSourceSizePixel$ = fromEvent(window, 'resize').pipe(
        debounceTime(100),
        map(event => (event.target as Window).innerWidth),
        filter((state) => state !== this.currentResolutionPixel))
      .subscribe( (state) => {
        this.currentResolutionPixel = state;
        if (!this.notifyChangeScreenPixel$) {
          this.notifyChangeScreenPixel$ = new BehaviorSubject<number>(state);
        } else {
          this.notifyChangeScreenPixel$.next(state);
        }
      });
  }

  getGrid(): GridType {

    let screenWidth = window.innerWidth;

    if (screenWidth < this.gridSizes.xs) {
      return GridType.xs;
    } else if (screenWidth >= this.gridSizes.xs && screenWidth < this.gridSizes.sm) {
      return GridType.sm;
    } else if (screenWidth >= this.gridSizes.sm && screenWidth < this.gridSizes.md) {
      return GridType.md;
    } else if (screenWidth >= this.gridSizes.md && screenWidth < this.gridSizes.lg) {
      return GridType.lg;
    } else {
      return GridType.xl;
    }
  }

  getScreenWidth() {
    return window.innerWidth;
  }

  isMobileDevice() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

  public changeScreenSizePixel(): Observable<any> {
    return this.notifyChangeScreenPixel$.asObservable();
  }

  public changeScreenSize(): Observable<any> {
    return this.notifyChangeScreen$.asObservable();
  }

  private calculateDimension(innerWidth: number): string {
    this.resetValues();
    if (innerWidth < this.gridSizes.sm) {
      this.mobileResolution = true;
      return 'mobileResolution';
    } else if (innerWidth >= this.gridSizes.sm && window.innerWidth < this.gridSizes.md) {
      this.dektopResolution = true;
      return 'tabletResolution';
    } else if (innerWidth >= this.gridSizes.md) {
      this.largeDektopResolution = true;
      return 'desktopResolution';
    }

  }

  private resetValues() {
    this.mobileResolution = false;
    this.tabletResolution = false;
    this.dektopResolution = false;
    this.largeDektopResolution = false;
  }

  public get isMobileResolution(): boolean {
    return this.mobileResolution;
  }

  public set isMobileResolution(value: boolean) {
    this.mobileResolution = value;
  }

  public get isTabletResolution(): boolean {
    return this.tabletResolution;
  }

  public set isTabletResolution(value: boolean) {
    this.tabletResolution = value;
  }

  public get isDektopResolution(): boolean {
    return this.dektopResolution;
  }

  public set isDektopResolution(value: boolean) {
    this.dektopResolution = value;
  }

  public get isLargeDektopResolution(): boolean {
    return this.largeDektopResolution;
  }
  public set isLargeDektopResolution(value: boolean) {
    this.largeDektopResolution = value;
  }


  ngOnDestroy(): void {
    this.controlSourceSize$.unsubscribe();
    this.controlSourceSizePixel$.unsubscribe();
  }


}
