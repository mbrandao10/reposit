import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement-arad',
  templateUrl: './movement-arad.component.html'
})
export class MovementARADComponent implements OnInit {

  @Input()
  movementDetail: any;

  constructor() { }

  ngOnInit() {}


}
