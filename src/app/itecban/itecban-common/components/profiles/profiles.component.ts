import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Profile } from 'onesait-api';
import { LoginService } from 'onesait-core';

@Component({
  selector: 'app-onesait-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  @Input() profiles: Profile[] = [];

  @Output() selectedProfile = new EventEmitter()
  @Output() backEvent = new EventEmitter()
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  /**
	 * Select the profile for the loged user
	 * @param profile declaracion del perfil
	 */
	chooseProfile(profile: Profile) {
	  this.loginService.setProfile(profile.id);
   // this.loginComponent.prepareApp();
     this.selectedProfile.emit();
  }

  back() {
    this.backEvent.emit();
  }

}
