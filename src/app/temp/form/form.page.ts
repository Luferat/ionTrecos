import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  public valid = false;

  public form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  constructor() { }

  ngOnInit() {

  }

  validate() {

    const fields = ['name', 'email', 'subject', 'message'];

    fields.forEach((field): any => {
      if (document.getElementById(field)!.classList.contains('ng-invalid')) return false;
    })

    this.valid = true;
    return true;
  }

}
