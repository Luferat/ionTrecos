import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.page.html',
  styleUrls: ['./policies.page.scss'],
})
export class PoliciesPage implements OnInit {

  env = environment;
  expires = new Date(this.env.policiesDate);

  constructor() { }

  ngOnInit() {
    this.expires.setFullYear(this.expires.getFullYear() + 10);
  }

}
