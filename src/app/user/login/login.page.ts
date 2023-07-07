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
  private auth: Auth = inject(Auth);

  constructor() { }

  ngOnInit() { }

  login() {
    // signInWithRedirect(this.auth, new GoogleAuthProvider());
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((res: any | null) => {
      console.log(res.user)
    })
  }

}
