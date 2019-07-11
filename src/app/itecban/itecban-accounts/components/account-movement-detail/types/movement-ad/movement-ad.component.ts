import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement-ad',
  templateUrl: './movement-ad.component.html'
})
export class MovementADComponent implements OnInit {

  @Input()
  movementDetail: any;

  constructor() { }

  ngOnInit() {}


}
