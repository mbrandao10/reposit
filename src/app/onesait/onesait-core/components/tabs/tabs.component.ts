import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, Renderer2, HostListener, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { TabElement } from '../../models/classes/page-config';
import { User } from 'onesait-api';
import { UtilsService } from '../../services/utils-service/utils.service';


@Component({
  selector: 'osb-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnChanges, OnInit, AfterViewInit {

  @Input()
  tabs: TabElement[];

  @Input()
  view: string;

  @Output()
  viewChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('element') tabsArray !: QueryList<ElementRef>;

  @ViewChild('tabsList') tabsList: ElementRef;

  selectedView: string;
  defaultClass: string;

  clicked: boolean;
  moved: boolean;
  clickStart: number;
  currentLeft: number;
  totalWidth: number;
  screenWidth: number;
  maxLeftMoving: number;

  user: User;

  constructor(
    private renderer: Renderer2,
    protected utilsService: UtilsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.view) {
      setTimeout(() => {
        this.changeView(changes.view.currentValue);
      });
    }
  }

  ngOnInit() {
   /*let  sectionTarget: TabElement[] = Object.assign([{}], this.tabs);
     if (sectionTarget) {
      this.user = JSON.parse(this.utilsService.getItemSessionStorage('user'));
      sectionTarget.forEach((tab, index, object) => {
         if (tab.hidden && tab.hidden.includes(this.user.activeProfileObj.relationShip.id)) {
          object.splice(index, 1);
         }
      }
      );
      this.tabs = sectionTarget;
     }*/
  }

  ngAfterViewInit() {
    this.prepareSlideMobile();
  }

  @HostListener('window:resize')
  onResize() {
    this.prepareSlideMobile();
  }

  prepareSlideMobile() {
    this.renderer.setStyle(this.tabsList.nativeElement, 'left', '0px');
    let children: any[]  = this.tabsList.nativeElement.children;
    let initMargin = 0;
    this.totalWidth = initMargin;
    for (let i = 0; i < children.length; i++) {
      let element = children[i];
      // La negrita nos aumenta el ancho, revisar que se recalcule el ancho
      this.totalWidth += element.offsetWidth + 2;
    }
    this.screenWidth = window.innerWidth;
    // TODO coger los 30px del padding dinamicamente
    this.maxLeftMoving = this.totalWidth - this.screenWidth  + 30;
    if (this.maxLeftMoving < 0 ) {
      this.maxLeftMoving = 0;
    }
    this.renderer.setStyle(this.tabsList.nativeElement, 'width',  this.totalWidth + 'px');
  }

  changeView(view: string) {
    if (!view && this.tabs && this.tabs.length > 0) {
      view = this.tabs[0].view;
    }
    this.selectedView = view;
    this.viewChange.emit(this.selectedView);
  }

  changeTabView(event: HTMLElement, view: string) {
    // Movemos de mas para que se vea el siguiente elemento
    this.renderer.setStyle(this.tabsList.nativeElement, 'transition', 'left 0.5s ease');
    let moveMargin = 50;
    if (this.moved) {
      this.moved = false;
    } else {
      this.changeView(view);
    }
    let left = event.offsetLeft;
    let right = left + event.offsetWidth;
    let currentLeft = this.tabsList.nativeElement.offsetLeft;
    // Hay que mover a la izquierda
    if (right + moveMargin + currentLeft > this.screenWidth) {
      let movePx = currentLeft - event.offsetWidth - moveMargin;
      if (movePx < -(this.maxLeftMoving)) {
        movePx = -this.maxLeftMoving;
      }
      this.renderer.setStyle(this.tabsList.nativeElement, 'left',  movePx + 'px');
    } else if ( currentLeft + left < 0 ) {
      let movePx = currentLeft + event.offsetWidth + moveMargin;
      if (movePx > 0 ) {
        movePx = 0;
      }
      this.renderer.setStyle(this.tabsList.nativeElement, 'left',  movePx + 'px');
    }
    setTimeout(() => {
      this.renderer.removeStyle(this.tabsList.nativeElement, 'transition');
    }, 500);

  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e) {
    if (this.clicked) {
      let currentPosition = e.screenX ? e.screenX : e.touches[0].screenX;
      let position = currentPosition - this.clickStart;
      let finalPosition = this.currentLeft + position;
      if (position !== 0 && this.maxLeftMoving) {
        this.moved = true;
      }
      // maximo que permitimos mover a la izquierda
      if (this.maxLeftMoving + finalPosition < 0) {
        finalPosition = -(this.maxLeftMoving);
      }
      // maximo que permitimos mover a la derecha
      if (finalPosition > 0) {
        finalPosition = 0;
      }
      this.renderer.setStyle(this.tabsList.nativeElement, 'left',  finalPosition + 'px');
    }
  }

  /////////////////////////////////////////////////

  @HostListener('mousedown', ['$event'])
  onMouseDown(e) {
    this.clicked = true;
    this.currentLeft = this.tabsList.nativeElement.offsetLeft;
    this.clickStart = e.screenX ? e.screenX : e.touches[0].screenX;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(_e) {
    this.clicked = false;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseOut(_e) {
    this.clicked = false;
  }

  /////////////////////////////////////////////////

  @HostListener('touchmove', ['$event'])
  ontouchmove(e) {
    this.onMouseMove(e);
  }

  @HostListener('touchstart', ['$event'])
  ontouchstart(e) {
    this.onMouseDown(e);
  }


  @HostListener('touchend', ['$event'])
  ontouchend(_e) {
    this.onMouseUp(_e);
    this.moved = false;
  }


}
