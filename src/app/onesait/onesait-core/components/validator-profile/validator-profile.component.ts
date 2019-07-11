import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils-service/utils.service';
import { User } from 'onesait-api';

@Component({
  selector: 'osb-validator-profile',
  templateUrl: './validator-profile.component.html'
})
export class ValidatorProfileComponent implements OnInit {

  perfilType: User;
  perfilId: boolean;

  constructor(
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.getItemSessionStorage();
  }

  getItemSessionStorage() {
    let user = this.utilsService.getItemSessionStorage('user');
    this.perfilType = JSON.parse(user);
    if (this.perfilType.activeProfileObj.relationShip.id === '01') {
      this.perfilId = false;
    } else {
      this.perfilId = true;
    }
  }
}
