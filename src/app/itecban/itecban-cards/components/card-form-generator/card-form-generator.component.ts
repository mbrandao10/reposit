import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SEARCH_CONFIG_TYPE, SearchConfig } from 'onesait-core';
import { FormGroup } from '@angular/forms';
import { CardGeneralComponent } from '../../classes/card-general.component';

@Component({
    selector: 'app-card-form-generator',
    templateUrl: './card-form-generator.component.html'
  })
export class CardFormGeneratorComponent extends CardGeneralComponent implements OnInit, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() formConfig: SearchConfig;
  @Output() changeEvent?: EventEmitter<any> = new EventEmitter<any>();

  SEARCH_CONFIG_TYPE = SEARCH_CONFIG_TYPE;
  resolution = 'default';

  constructor() {
    super();
  }

  ngOnInit() {
  }

  changeAnyEvent(control: any) {
    // console.log(control);
    this.changeEvent.emit(control);
  }

  ngOnDestroy() {}

}
