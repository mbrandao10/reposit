import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-movement-liq',
  templateUrl: './movement-liq.component.html'
})
export class MovementLIQComponent  implements OnInit {

  @Input()
  movementDetail: any;

  constructor() { }

  ngOnInit() {}


}
