import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NBExpressBillService} from 'onesait-core';
import { EBStatusTypes, EBRemittances, } from 'onesait-api';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'osb-nbexpress-orders-remittances',
  templateUrl: './nbexpress-orders-remittances.component.html'
})
export class NbExpressOrdersRemittancesComponent   {

  @Input() contractId: string;

  statusTypes: EBStatusTypes[];
  remittanceStatusTypes: EBStatusTypes[];
  remittance: EBRemittances;
  loading: boolean;
  radioForm: FormControl;

  constructor(private nbExpresBillService: NBExpressBillService) {
    this.loadData();
    this.createFormControl();
  }


  loadData() {
    this.loading = true;
    let observableData: any = [];

    observableData.push(this.nbExpresBillService.getOrderTypes());
    observableData.push(this.nbExpresBillService.getRemittanceTypes());

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

  getRemittance(remittance: EBRemittances) {
    // Remesa recibida de la consulta de remesas
    this.remittance = remittance;
    this.radioForm.setValue('optOrders');
  }

  changeRadio() {
    this.remittance = null;
  }

}
