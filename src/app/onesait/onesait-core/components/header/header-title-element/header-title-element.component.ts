import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { HeaderTitleElement, HeaderTitleArray } from '../../../models/classes/header';
import { RouterHelperService } from '../../../services/router-helper-service/router-helper.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../services/share-service/share.service';
import { DeviceUtilsService } from '../../../services/device-utils-service/device-utils.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'osb-header-title-element',
  templateUrl: './header-title-element.component.html'
})
export class HeaderTitleElementComponent implements OnChanges, OnDestroy {


  @Input()
  headerElement: any;

  @Input()
  level: number;

  comboElements: HeaderTitleArray;
  title: string;
  titleElement: HeaderTitleElement;
  element: number;

  resolution;
  deviceUtilsServiceSubscription: Subscription;

  constructor(
    protected shareService: ShareService,
    private router: Router,
    protected deviceUtilsService: DeviceUtilsService
  ) {

    this.deviceUtilsServiceSubscription = deviceUtilsService
      .changeScreenSize()
      .subscribe(_screenSize => {
        this.resolution = _screenSize;
      });

  }

  ngOnChanges() {
    this.comboElements = null;
    this.titleElement = null;

    if (this.headerElement) {

      if (this.headerElement.elements) {
        this.element = 3;
        this.comboElements = this.headerElement;
      } else if (this.headerElement.title) {
        this.element = 2;
        this.titleElement = this.headerElement;
      } else {
        this.element = 1;
        this.title = this.headerElement;
      }
    }

  }

  goTo(element: HeaderTitleElement) {
    if (element.routeCardId) {
      if (element.routeCardId &&
        (element.title !== this.comboElements.selectedTitle
        && element.routeCardId !== this.comboElements.selectedId)) {
        this.shareService.setData('cardId', element.routeCardId);
        let link = [RouterHelperService.getPathFromId(element.routeId, element.routeParams)];
        this.router.navigate(link);
      }
    } else {
      if (this.comboElements &&
        (element.title !== this.comboElements.selectedTitle
          || element.routeParams.id !== this.comboElements.selectedId)) {
        let link = [RouterHelperService.getPathFromId(element.routeId, element.routeParams)];
        this.router.navigate(link);
      } else if (this.level === 1) {
        let link = [RouterHelperService.getPathFromId(element.routeId, element.routeParams)];
        this.router.navigate(link);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.deviceUtilsServiceSubscription) {
      this.deviceUtilsServiceSubscription.unsubscribe();
    }
  }

}
