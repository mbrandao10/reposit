import { Component, Input } from '@angular/core';
import { Address } from 'onesait-api';

@Component({
  selector: 'osb-profile-success',
  templateUrl: './profile-success.component.html'
})
export class ProfileSuccessComponent {

  @Input() addressPersonalPostal: Address;



}
