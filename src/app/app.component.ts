import { environment } from './../environments/environment';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public env = environment;

  public appPages = [
    { title: 'Início', url: '/home', icon: 'home' },
    { title: 'Faça Contato', url: '/contacts', icon: 'chatbubbles' },
    { title: 'Sobre', url: '/about', icon: 'information-circle' }
  ];

  constructor() { }
}
