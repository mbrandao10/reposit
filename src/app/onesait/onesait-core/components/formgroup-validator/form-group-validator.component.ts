import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osb-formgroup-validator',
  templateUrl: './form-group-validator.component.html'
})
export class FormGroupValidatorComponent implements OnInit, OnChanges, AfterViewInit {


  @Input() formGroup: FormGroup;


  errorText: string;

  constructor(protected translateService: TranslateService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formGroup) {
      changes.formGroup.currentValue.statusChanges.subscribe(() => {
        if (this.formGroup.errors) {
          Object.keys(this.formGroup.errors).map((errorName) => {
            let domain = errorName.split(/\./g);
            this.translateService.get(domain[0] + '.FORMGROUP-VALIDATOR.' + domain[1].toUpperCase()).subscribe((result: any) => {
              this.errorText = result;
            });
          });
        }
      });
    }
  }

  ngAfterViewInit() {

  }

}
