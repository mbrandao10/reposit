import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { CompareModificationsService } from '../services/compare-modifications-service/compare-modifications.service';
import { ModalService } from 'onesait-core';

export class CanDeactivateComponent {

}

@Injectable()
export class ConfirmDeactivateGuard implements CanDeactivate<CompareModificationsService> {

  constructor(private target: CompareModificationsService, private modalService: ModalService) {

  }

  canDeactivate() {
    if (!this.target.validateComparations()) {
        return this.modalService.showConfirmModal('ITECBAN-COMMON.COMPONENT.HEADER.CONFIRM.TEXT');
                // return window.confirm('Hay cambios pendientes de guardar, ¿Desea abandonar la página?');
    } else {
      return true;
    }
  }
}
