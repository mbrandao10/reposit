import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericIdNameElement, TransferExecutionMoment } from 'onesait-api';
import { formatDate } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'osb-transfer-execution',
  templateUrl: './transfer-execution.component.html'
})
export class TransferExecutionComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() transferForm: FormGroup;
  @Input() frequencyTypes: GenericIdNameElement[];
  @Input() hideHeader: boolean;
  @Input() action: string;
  date = new Date();   // ITECNB - 725
  dateMore = this.date.getDate() + this.date.getTime() + 86400000;
  minDate = new Date(this.dateMore);
  minDateTo = this.date.getDate() + this.date.getTime() + 172800000;
  mes = this.date.getMonth();
  maxDate = new Date(this.minDateTo);
  today = formatDate(this.date, 'dd/MM/yyyy');   // ITECNB - 730
  noFinish: boolean;
  transferFormSubscription: Subscription;


  @ViewChild('check')
      check: ElementRef;


  ngOnInit(): void {
    this.prepareForm(this.transferForm.get('executionMoment').value); 
    this.transferFormSubscription = this.transferForm.get('executionMoment').valueChanges.subscribe((val: TransferExecutionMoment) => {
      this.prepareForm(val);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterViewInit() {
    if (this.action === 'MODIFYSCHEDULED') {
      // this.check.nativeElement.disabled = true;
    }
    if (this.transferForm) {
      if (this.transferForm.get('lastExecutionDate').value === '31-12-9999') {
        this.noFinish = true;
      } else if (this.transferForm.get('periodicUndefined').value) {
        this.noFinish = true;
      }
    }
  }

  prepareForm(val: TransferExecutionMoment) {

   if (this.action !== 'MODIFYSCHEDULED') {
      switch (val) {
        case TransferExecutionMoment.P:
          console.log('P');
          this.transferForm.get('executionDate').enable();
          this.transferForm.get('firstExecutionDate').disable();
          this.transferForm.get('lastExecutionDate').disable();
          this.transferForm.get('frequencyType').disable();
          break;
        case TransferExecutionMoment.S:
          console.log('S');
          this.transferForm.get('executionDate').disable();
          this.transferForm.get('firstExecutionDate').enable();
          this.transferForm.get('lastExecutionDate').enable();
          this.transferForm.get('frequencyType').enable();
          this.noFinish = false;
          if (!this.transferForm.get('firstExecutionDate').value) {
            this.transferForm.get('firstExecutionDate').setValue(this.minDate);
          }
          break;
        default:
          console.log('N');
          this.transferForm.get('executionDate').disable();
          this.transferForm.get('firstExecutionDate').disable();
          this.transferForm.get('lastExecutionDate').disable();
          this.transferForm.get('lastExecutionDate').setValue(null);
          this.transferForm.get('frequencyType').disable();
          if (!this.transferForm.get('firstExecutionDate').value) {
            this.transferForm.get('firstExecutionDate').setValue(this.minDate);
          }
          break;
      }
    }
  }

  changeCheckbox() {
    this.transferForm.get('periodicUndefined').setValue(this.noFinish);
    if (this.noFinish) {
      this.transferForm.get('lastExecutionDate').disable();
      this.transferForm.get('lastExecutionDate').setValue(null);
      this.transferForm.get('lastExecutionDate').clearValidators();
      this.transferForm.get('lastExecutionDate').updateValueAndValidity();
    } else {
      this.transferForm.get('lastExecutionDate').enable();
      if (this.action === 'MODIFYSCHEDULED') {
        if ( this.transferForm.get('lastExecutionDate').value === '31-12-9999') {
          this.transferForm.get('lastExecutionDate').setValue(null);
        }
        this.transferForm.markAsTouched();
      }
      this.transferForm.get('lastExecutionDate').clearValidators();
      this.transferForm.get('lastExecutionDate').updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    if (this.transferFormSubscription) {
      this.transferFormSubscription.unsubscribe();
    }
  }

}
