import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fblist',
  templateUrl: './fblist.page.html',
  styleUrls: ['./fblist.page.scss'],
})
export class FblistPage implements OnInit {

  // Injeta Firestore.
  private firestore: Firestore = inject(Firestore);

  // Identifica a coleção.
  private fbCollection = collection(this.firestore, 'things');

  // Armazena response da coleção para a view.
  public things: Observable<any>;

  constructor() {

    // Obtém coleção e armazena em 'things'.
    this.things = collectionData(this.fbCollection, { idField: 'id' }) as Observable<any>;
  }

  ngOnInit() { }

}
