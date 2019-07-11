import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'onesait-core';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html'
})
export class HeadComponent implements OnInit {

  constructor(private router: Router,
              private utilsService: UtilsService) { }

  nameUser: any = '';

  ngOnInit() {
    this.nameUser = this.utilsService.getUser().userName;
  }

  viewMailbox() {
    let link = ['/itecban/mailbox'];
		this.router.navigate(link);
  }

  viewDocumentbox() {
    let link = ['/itecban/documentbox'];
		this.router.navigate(link);
  }

}
