import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoHeaderService } from '../info-header-service/info-header.service';
import { ModalService } from '../modal-service/modal.service';
import { DeviceUtilsService } from '../device-utils-service/device-utils.service';

@Injectable()
export class NotificationsManagerService {
  constructor(
   protected infoHeaderService: InfoHeaderService,
   protected modalService: ModalService,
   protected deviceUtilsService: DeviceUtilsService
  ) { }

  errorNotificationBusiness(errorResponse: string | HttpErrorResponse) {
    let err: string;
    if ( errorResponse instanceof HttpErrorResponse) {
       err = errorResponse.error.result.errors[0].errorDescription;
    } else {
       err = errorResponse;
    }
   if (!this.deviceUtilsService.isMobileResolution) {
      this.infoHeaderService.showErrorHeader(err);
   } else {
      this.modalService.showErrorModal(err);
   }
  }

  InfoNotificationBusiness(message: string ) {
     if (!this.deviceUtilsService.isMobileResolution) {
        this.infoHeaderService.showInfoHeader( message );
     } else {
        this.modalService.showInfoModal(message);
     }
 }

  WarningNotificationBusiness(message: string ) {
     if (!this.deviceUtilsService.isMobileResolution) {
        this.infoHeaderService.showWarningHeader( message );
     } else {
        this.modalService.showWarningModal(message);
     }
 }

}
