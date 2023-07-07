import { Component, inject, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, User } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public env = environment;

  constructor(private auth: Auth = inject(Auth)) { }

  ngOnInit() { }

  login() {
    if (this.env.signInMethod == 'redirect')
      signInWithRedirect(this.auth, new GoogleAuthProvider());
    else
      signInWithPopup(this.auth, new GoogleAuthProvider());
  }

}
