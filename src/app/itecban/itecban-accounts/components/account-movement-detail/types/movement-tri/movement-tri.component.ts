import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement-tri',
  templateUrl: './movement-tri.component.html'
})
export class MovementTRIComponent implements OnInit {

  @Input()
  movementDetail: any;

  constructor() { }

  ngOnInit() {}


}
