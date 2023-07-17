import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Injeta Firestore.
  private firestore: Firestore = inject(Firestore);

  // Identifica a coleção.
  private fbCollection = collection(this.firestore, 'things');

  // Armazena response da coleção para a view.
  public things: any;

  env = environment;

  constructor() {

    // Obtém coleção e armazena em 'things'.
    this.things = collectionData(
      query(this.fbCollection, orderBy('date', 'desc')),
      { idField: 'id' }
    ) as Observable<any>;

  }

  ngOnInit() { }

}
