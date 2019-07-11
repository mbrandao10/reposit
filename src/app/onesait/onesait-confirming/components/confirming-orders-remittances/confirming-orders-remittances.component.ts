import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfirmingService } from 'onesait-core';
import { ConfirmingStatusTypes, ConfirmingRemittances, } from 'onesait-api';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'osb-confirming-orders-remittances',
  templateUrl: './confirming-orders-remittances.component.html'
})
export class ConfirmingOrdersRemittancesComponent {

  @Input() contractId: string;

  statusTypes: ConfirmingStatusTypes[] = [];
  remittanceStatusTypes: ConfirmingStatusTypes[] = [];
  remittance: ConfirmingRemittances;
  loading: boolean;
  radioForm: FormControl;

  constructor(private confirmingService: ConfirmingService) {
    this.loadData();
    this.createFormControl();
  }


  loadData() {
    this.loading = true;
    let observableData: any = [];

    observableData.push(this.confirmingService.getOrderTypes());
    observableData.push(this.confirmingService.getRemittanceTypes());

    forkJoin(observableData).subscribe((result: any) => {
      this.statusTypes = result[0]['data'];
      this.remittanceStatusTypes = result[1]['data'];
      this.loading = false;
      if (this.statusTypes) {
        this.statusTypes.unshift({ name: '', id: null }); //Opcion en blanco
      }
      if (this.remittanceStatusTypes) {
        this.remittanceStatusTypes.unshift({ name: '', id: null }); //Opcion en blanco
      }
    }, () => {
      this.loading = false;
    });
  }

  createFormControl() {
    this.radioForm = new FormControl('optOrders', Validators.required);
  }

  getRemittance(remittance: ConfirmingRemittances) {
    // Remesa recibida de la consulta de remesas
    this.remittance = remittance;
    this.radioForm.setValue('optOrders');
  }

  changeRadio() {
    this.remittance = null;
  }

}
