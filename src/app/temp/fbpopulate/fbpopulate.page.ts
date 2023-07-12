import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-fbpopulate',
  templateUrl: './fbpopulate.page.html',
  styleUrls: ['./fbpopulate.page.scss'],
})
export class FbpopulatePage implements OnInit {

  // Dados (documentos) a serem inseridos.
  private addData = [
    { name: 'Coisa', description: 'Alguma coisa', location: 'Algum lugar', date: '2023-06-12 12:13:14', status: 'on' },
    { name: 'Bagulho', description: 'Algum bagulho', location: 'Lá mesmo', date: '2023-06-16 15:16:47', status: 'on' },
    { name: 'Troço', description: 'Algum troço', location: 'Nenhum lugar', date: '2023-06-21 21:26:27', status: 'on' },
    { name: 'Tranqueira', description: 'Alguma tranqueira', location: 'No canto', date: '2023-06-27 11:22:33', status: 'on' },
    { name: 'Gambirra', description: 'Alguma gambirra', location: 'Logo embaixo', date: '2023-07-01 00:01:02', status: 'on' },
    { name: 'Traquitana', description: 'Alguma traquitana', location: 'Depois da curva', date: '2023-07-03 17:34:36', status: 'on' }
  ];

  // Injeta Firestore.
  private firestore: Firestore = inject(Firestore);

  // Identifica a coleção.
  private fbCollection = collection(this.firestore, 'things');

  constructor() {

    // Itera documentos.
    this.addData.forEach(data => {

      // Insere cada documento na coleção.
      addDoc(this.fbCollection, data)
    });
  }

  ngOnInit() { }

}
