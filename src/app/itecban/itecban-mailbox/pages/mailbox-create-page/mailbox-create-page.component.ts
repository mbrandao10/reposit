import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-mailbox-create-page',
  templateUrl: './mailbox-create-page.component.html'
})
export class MailboxCreatePageComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() { }

  mailSended() {
    this.location.back();

  }

}
