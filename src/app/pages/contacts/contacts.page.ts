import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
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

  constructor() { }

  ngOnInit() { }

  sendForm() {

    // Valida preenchimento dos campos.
    if (
      this.form.name.length < 3 ||
      this.form.email.indexOf('@') < 1 ||
      this.form.subject.length < 3 ||
      this.form.message.length < 5
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
