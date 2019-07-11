import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'osb-confirming-add-resume',
  templateUrl: './confirming-add-resume.component.html'
})
export class ConfirmingAddResumeComponent implements OnInit {

  @Input() accountInfo: any;
  @Input() newConfirmingForm: FormGroup;
  finishDate: Date;

  constructor(

  ) {

  }

  ngOnInit() {
    this.finishDate = new Date();
  }



}
