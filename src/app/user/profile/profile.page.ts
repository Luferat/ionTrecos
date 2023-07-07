import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  authState = authState(this.auth);
  authStateSubscription = new Subscription;
  user!: User;
  userFirstName = 'Perfil de Usuário';
  env = environment;

  constructor(private auth: Auth = inject(Auth)) { }

  ngOnInit() {
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {
        if (userData) {
          this.user = userData;
          this.userFirstName = 'Olá ' + this.user.displayName?.split(' ')[0];
        }
      }
    );
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  logout() {
    this.auth.signOut();
    alert('Você saiu do aplicativo');
    location.href = '/home';
  }

  toProviderProfile() {
    window.open('https://myaccount.google.com/', 'blank');
  }

}
