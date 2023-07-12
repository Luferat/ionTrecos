import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  public env = environment;

  // Modela entidade form.
  public form = {
    name: '',
    email: '',
    subject: '',
    message: '',
    date: '',
    status: 'received',
    sended: false
  }

  // Injeta Firestore.
  private firestore: Firestore = inject(Firestore);

  // Referência à coleção "contacts" no Firestore.
  // Se a coleção não existe, será criada.
  contactsCollection = collection(this.firestore, 'contacts');

  // Prepara a autenticação do usuário.
  authState = authState(this.auth);
  authStateSubscription = new Subscription;

  constructor(
    // Injeta a dependêndia do Firebase Auth.
    private auth: Auth = inject(Auth)
  ) { }

  ngOnInit() {

    // Observer que obtém status de usuário logado.
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {

        // Se tem alguém logado.
        if (userData) {

          // Preenche os campos 'nome' e 'email'.
          this.form.name = userData.displayName + '';
          this.form.email = userData.email + '';
        }
      }
    );

  }

  ngOnDestroy() {

    // Remove o observer ao concluir o componente.
    this.authStateSubscription.unsubscribe();
  }

  // Salva contato.
  sendForm() {

    // Regex simples para validar e-mail.
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Valida preenchimento dos campos.
    if (
      this.form.name.trim().length < 3 ||
      !regexEmail.test(this.form.email.trim()) ||
      this.form.subject.trim().length < 3 ||
      this.form.message.trim().length < 5
    ) return false;

    // Gera a data atual no formado ISO.
    const d = new Date();
    this.form.date = d.toISOString().split('.')[0].replace('T', ' ');

    // Salva contato no Firestore.
    addDoc(this.contactsCollection, this.form)
      .then((data) => {
        console.log('Contato salvo com Id :' + data.id)
        this.form.sended = true;
      })

    // Encerra sem fazer mais nada.
    return false;
  }

}
