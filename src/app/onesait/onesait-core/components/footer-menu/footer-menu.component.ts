import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { RouterHelperService } from '../../services/router-helper-service/router-helper.service';
import { Router } from '@angular/router';
import { HeaderSectionsConfig } from '../../models/interfaces/header-config.interface';

@Component({
  selector: 'osb-footer-menu',
  templateUrl: './footer-menu.component.html',
})
export class FooterMenuComponent implements OnInit {

  @Input() operations: HeaderSectionsConfig[];
  // Usado para cerrar el menu si ya estamos en la página enrutada
  @Output() showChange = new EventEmitter();

  show: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  open() {  
    this.show = true;
  }

  close() {
    this.show = false;

  }

  goTo(operation) {
    // this.showChange.emit(this.show);
    let link = [RouterHelperService.getPathFromId(operation.routeId)];
    this.router.navigate(link);
    this.close();
  }

}
