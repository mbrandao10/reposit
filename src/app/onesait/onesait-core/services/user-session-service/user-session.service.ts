import { Injectable } from '@angular/core';
import { UtilsService } from '../utils-service/utils.service';
import { constants } from '../../config/constants';
import { Profile } from 'onesait-api';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class UserSessionService {

  finishTimeout: number;
  timeoutTime: number;
  activeProfile: string;

  changeActiveProfile$: Subject<void>;

  constructor(private utilsService: UtilsService) {
    if (this.utilsService.getItemSessionStorage('session_timeout')) {
      let timeout = this.utilsService.getItemSessionStorage('session_timeout');
      if (timeout) {
        this.setMaxSessionTimeout(parseInt(timeout, 10));
      }
    }
    this.changeActiveProfile$ = new Subject<void>();

  }

  setMaxSessionTimeout(timeout: number) {
    if (timeout) {
      this.timeoutTime = timeout * 1000;
      this.utilsService.setItemSessionStorage('session_timeout', timeout);
      this.refreshFinishSessionTimeout();
    }
  }

  refreshFinishSessionTimeout() {
    if (this.timeoutTime) {
      this.finishTimeout = new Date().getTime() + this.timeoutTime;
    }
  }

  getSessionTimeoutLimit() {
    if (this.timeoutTime > 0) {
      return this.finishTimeout - new Date().getTime();
    } else {
      return 999999999999;
    }
  }

  setActiveProfile(activeProfile: string) {
    this.utilsService.setItemSessionStorage('USER_PROFILE', activeProfile);
    this.activeProfile = activeProfile;
    let user = JSON.parse(this.utilsService.getItemSessionStorage(constants.USER));
    user.profiles.forEach(element => {
      if (element.id === activeProfile) {
        user.activeProfileObj = element;
      }
    });
    user.activeProfile = this.activeProfile;
    this.utilsService.setItemSessionStorage(constants.USER, JSON.stringify(user));

  }

  getActiveProfile() {
    if (!this.activeProfile && this.utilsService.getItemSessionStorage('USER_PROFILE')) {
      this.activeProfile = this.utilsService.getItemSessionStorage('USER_PROFILE');
    }
    return this.activeProfile;
  }

  getProfiles(): Profile[] {
    let user = JSON.parse(this.utilsService.getItemSessionStorage(constants.USER));
    let profiles: Profile[] =  user.profiles;
    return profiles;
  }


  getChangeProfileEvent(): Observable<void> {
    return this.changeActiveProfile$.asObservable();
  }

  changeProfileEvent() {
    this.changeActiveProfile$.next();
  }

}
