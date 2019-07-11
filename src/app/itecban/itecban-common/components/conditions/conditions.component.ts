import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConditionsElement } from '../../interfaces/conditions/conditions.interface';

@Component({
	selector: 'app-conditions',
	templateUrl: './conditions.component.html'
})
export class ConditionsComponent implements OnInit {

  @Input() conditions: ConditionsElement;
  @Output() read: EventEmitter<any> = new EventEmitter<any>();

  allRead = 0;
  loading = true;
  viewCheck = false;
  accept = false;

  constructor() {} 

  ngOnInit() {
    this.loading = false;
  }

  viewLink(link) {
    for (let i = 0; i < this.conditions.data.length; i++)  {
      if (this.conditions.data[i].text === link.text && !this.conditions.data[i].read) {
        this.allRead++;
        this.conditions.data[i].read = true;
      }
    }
    if (this.allRead === this.conditions.data.length) {
      this.read.emit(true);
    }
    let url = link.link;
    window.open(url, '_blank');
  }

}
