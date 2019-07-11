import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import { AppConfigService } from 'onesait-core';

/*
EJEMPLOS DE USO

<span class="hidden-xs text-no-warp" [fittext]="true" [minFontSize]="12" [maxFontSize]="21" [minFontSizeTablet]="12" [maxFontSizeTablet]="21" [minFontSizeMobile]="12" [maxFontSizeMobile]="21"></span>
<span [fittext]="true" [maxCurrentFontSize]="true"></span>
<span [fittext]="true"></span>
*/

@Directive({
  exportAs: 'fittext',
  selector: 'fittext, [fittext]',
})
export class AngularFittextDirective implements AfterViewInit, OnInit, OnChanges {

  @Input() fittext ? = true;
  @Input() maxCurrentFontSize ? = false;
  @Input() compression ?  = 1;
  @Input() activateOnResize ? = true;
  @Input() minFontSize?: number | 'inherit' = 0;
  @Input() maxFontSize?: number | 'inherit' = Number.POSITIVE_INFINITY;
  @Input() minFontSizeTablet?: any | 'inherit' = 0;
  @Input() maxFontSizeTablet?: any | 'inherit' = Number.POSITIVE_INFINITY;
  @Input() minFontSizeMobile?: any | 'inherit' = 0;
  @Input() maxFontSizeMobile?: any | 'inherit' = Number.POSITIVE_INFINITY;
  @Input() delay ? = 100;
  @Input() ngModel;
  @Input() fontUnit?: 'px' | 'em' | string = 'px';

  private fittextParent: HTMLElement;
  private fittextElement: HTMLElement;
  private fittextMinFontSize: number;
  private fittextMaxFontSize: number;
  private fittextMinFontSizeTablet: number;
  private fittextMaxFontSizeTablet: number;
  private fittextMinFontSizeMobile: number;
  private fittextMaxFontSizeMobile: number;
  private computed: CSSStyleDeclaration;
  private newlines: number;
  private lineHeight: string;
  private display: string;
  private calcSize = 10;
  private minSize = 12;
  // private resizeTimeout: number;

  constructor(
    public el: ElementRef,
    private renderer: Renderer2,
    private appConfigService: AppConfigService
  ) {
    this.fittextElement = el.nativeElement;
    this.fittextParent = this.fittextElement.parentElement;
    this.computed = window.getComputedStyle(this.fittextElement);
    this.newlines = this.fittextElement.childElementCount > 0 ? this.fittextElement.childElementCount : 1;
    this.lineHeight = this.computed['line-height'];
    this.display = this.computed['display'];
  }

  @HostListener('window:resize')
  public onWindowResize = (): void => {
    if (this.activateOnResize) {
      this.setFontSize();
    }
  }

  public ngOnInit() {

    let sizeStr: string = this.computed['font-size'];
    let size = +sizeStr.replace('px', '').trim();

    let defaultSize = this.minSize;

    if (size < this.minSize) {
      defaultSize = size;
    }

    if (this.maxCurrentFontSize) {
      this.maxFontSize = size;
      this.maxFontSizeTablet = size;
      this.maxFontSizeMobile = size;
    }

    this.fittextMinFontSize = this.minFontSize === 'inherit' ? defaultSize : this.minFontSize;
    this.fittextMaxFontSize = this.maxFontSize === 'inherit' ? defaultSize : this.maxFontSize;

    this.fittextMinFontSizeTablet = this.minFontSize === 'inherit' ? defaultSize : this.minFontSizeTablet;
    this.fittextMaxFontSizeTablet = this.maxFontSize === 'inherit' ? defaultSize : this.maxFontSizeTablet;

    this.fittextMinFontSizeMobile = this.minFontSize === 'inherit' ? defaultSize : this.minFontSizeMobile;
    this.fittextMaxFontSizeMobile = this.maxFontSize === 'inherit' ? defaultSize : this.maxFontSizeMobile;
  }

  public ngAfterViewInit() {
    this.setFontSize();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['compression'] && !changes['compression'].firstChange) {
      this.setFontSize();
    }
    if (changes['ngModel']) {
      this.fittextElement.innerHTML = this.ngModel;
      this.setFontSize();
    }
  }

  private setFontSize = (): void => {
   setTimeout(
      (() => {
        if (this.fittextElement.offsetHeight * this.fittextElement.offsetWidth !== 0) {
          // reset to default
          this.setStyles(this.calcSize, 1, 'inline-block');
          // set new
          this.setStyles(this.calculateNewFontSize(), this.lineHeight, this.display);
        }
      }).bind(this),
      this.delay
    );
  }

  private calculateNewFontSize = (): number => {
    const ratio = (this.calcSize * this.newlines) / this.fittextElement.offsetWidth / this.newlines;

    let fontSizeMin = this.fittextMinFontSize;
    let fontSizeMax = this.fittextMaxFontSize;

    let sizes: any = this.appConfigService.getConfig('grid.sizes');

    if (window.innerWidth < sizes.sm) {
      fontSizeMin = this.fittextMinFontSizeMobile;
      fontSizeMax = this.fittextMaxFontSizeMobile;
    } else if (window.innerWidth < sizes.md) {
      fontSizeMin = this.fittextMinFontSizeTablet;
      fontSizeMax = this.fittextMaxFontSizeTablet;
    }

    return Math.max(
      (this.fittextParent ?
      Math.min(
        (this.fittextParent.offsetWidth -
          (parseFloat(getComputedStyle(this.fittextParent).paddingLeft) +
            parseFloat(getComputedStyle(this.fittextParent).paddingRight)) -
          6) *
        ratio *
        this.compression,
        fontSizeMax
      ) : this.minSize),
      fontSizeMin
    );
  }

  private setStyles = (fontSize: number, lineHeight: number | string, display: string): void => {
    this.renderer.setStyle(this.fittextElement, 'fontSize', fontSize.toString() + this.fontUnit);
    this.renderer.setStyle(this.fittextElement, 'lineHeight', lineHeight.toString());
    this.renderer.setStyle(this.fittextElement, 'display', display);
  }
}
