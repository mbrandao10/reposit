import { Component, OnInit, ElementRef, ContentChild, OnDestroy, AfterViewInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  template: `<div class="modal-header">
                <div class="modal-title">
                  <div class="row">
                    <div class="col-xs-10">
                      <ng-content></ng-content>
                    </div>
                    <div class="col-xs-2">
                      <i #closeButton class="pull-right text-blue interactive fs-28 text-os-semibold icon icononesait icon-close" (click)="close()"></i>
                    </div>
                  </div>
                </div>
            </div>`
})
export class ModalHeaderComponent implements AfterViewInit, OnChanges {

  @Input()
  protected backGroundColor?: string;
  @Input()
  protected colorCloseButton?: string;

  @ViewChild('closeButton', {read: ElementRef}) closeButton: ElementRef;


  private closeEvent = new Subject<any>();
  closeObservable: Observable<any> = this.closeEvent.asObservable();

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    if (this.backGroundColor) {
      this.el.nativeElement.children[0].classList.add(this.backGroundColor);
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.backGroundColor) {
      this.el.nativeElement.children[0].classList.remove(changes.backGroundColor.previousValue);
      this.el.nativeElement.children[0].classList.add(changes.backGroundColor.currentValue);
    }
    if (changes.colorCloseButton) {
      this.closeButton.nativeElement.classList.remove(changes.colorCloseButton.previousValue);
      this.closeButton.nativeElement.classList.add(changes.colorCloseButton.currentValue);
      this.closeButton.nativeElement.classList.remove('text-blue');
    }
  }


  close() {
    this.closeEvent.next();
  }
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {

  @ContentChild(ModalHeaderComponent) private header: ModalHeaderComponent;

  private subscriptionClose: Subscription;

  visibleContent: boolean;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.header) {
      this. subscriptionClose = this.header.closeObservable.subscribe(() => {
        this.close();
      });
    }
  }

  ngOnDestroy() {
    if (this.subscriptionClose) {
      this.subscriptionClose.unsubscribe();
    }
  }

  open() {
    this.el.nativeElement.classList.add('modal-visible');
    this.visibleContent = true;
    return this;
  }

  close() {
    this.el.nativeElement.classList.remove('modal-visible');
    this.visibleContent = false;
  }

  dismiss() {
    this.el.nativeElement.classList.remove('modal-visible');
  }

}



@Component({
  selector: 'app-modal-body',
  template: `<div class="modal-body">
              <ng-content></ng-content>
            </div>`
})
export class ModalBodyComponent  implements AfterViewInit,OnChanges {

  @Input()
  protected backGroundColor?: string;

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    if (this.backGroundColor) {
      this.el.nativeElement.children[0].classList.add(this.backGroundColor);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.backGroundColor) {
      this.el.nativeElement.children[0].classList.remove(changes.backGroundColor.previousValue);
      this.el.nativeElement.children[0].classList.add(changes.backGroundColor.currentValue);
    }
  }
}


@Component({
  selector: 'app-modal-footer',
  template: `<div class="modal-footer">
              <ng-content></ng-content>
            </div>`
})
export class ModalFooterComponent {

  /*constructor(private modalComponent:ModalComponent){

  }

  close(){
    this.modalComponent.close();
  }*/
}
