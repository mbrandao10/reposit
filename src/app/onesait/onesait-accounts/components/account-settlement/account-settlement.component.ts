import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'onesait-core';
import { SettlementDates, Settlements } from 'onesait-api';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'osb-account-settlement',
  templateUrl: './account-settlement.component.html'
})
export class AccountSettlementComponent  implements OnInit {

  @Input() accountId: any;
  loading: boolean;

  settlementDatesForm: FormControl;
  settlementsForm: FormGroup;
  settlementDates: SettlementDates;
  settlements: Settlements;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.loading = true;
    this.createFormControl();
    this.accountService.getSettlementDates(this.accountId).subscribe(result => {
    // this.accountService.getSettlementDates(this.settlementDatesForm.value).subscribe(result => {
      this.settlementDates = result.data;
      this.settlementsForm.patchValue({ date: this.settlementDates[0].date});
    }, () => {
      this.loading = false;
    });
  }

  createFormControl() {
    this.settlementDatesForm = new FormControl(this.accountId, Validators.required);
    this.settlementsForm = new FormGroup({
      accountId: new FormControl(this.accountId, Validators.required),
      date: new FormControl('', Validators.required)
    });
    this.onChanges();
  }


  onChanges() {
    this.settlementsForm.valueChanges.subscribe(() => {
      if (this.settlementsForm.value.date) {
        this.getSettlementsData();
      }
    });
  }

  getSettlementsData() {
    this.loading = true;
    this.accountService.getSettlements(this.settlementsForm.value.accountId, this.settlementsForm.value.date).subscribe(result => {
      this.settlements = result.data;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

}
