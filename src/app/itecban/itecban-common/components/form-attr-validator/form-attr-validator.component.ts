import { Component, OnInit, Input } from '@angular/core';

export interface OptionsValidator {
  validateObject: boolean;
  hideError: boolean;
}



@Component({
  selector: 'app-form-attr-validator',
  templateUrl: './form-attr-validator.component.html'
})
export class FormAttrValidatorComponent implements OnInit {

  /**
   * If we need to add class, we only must do <app-form-attr-validator class="myClass"></app-form-attr-validator>
   */

  /**
   * Element of the form
   */
  @Input()
  formAttr: any;

  @Input()
  errorMessage: any;

  @Input()
  opts: OptionsValidator = {validateObject : false, hideError: false};

  @Input()
  validateObject: boolean;

  @Input()
  classes: string;


  constructor() { }

  ngOnInit() {}

}
