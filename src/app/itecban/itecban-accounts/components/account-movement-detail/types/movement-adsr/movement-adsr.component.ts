import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement-adsr',
  templateUrl: './movement-adsr.component.html'
})
export class MovementADSRComponent implements OnInit {

  @Input()
  movementDetail: any;

  constructor() { }

  ngOnInit() {}


}
