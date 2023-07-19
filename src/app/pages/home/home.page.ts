import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query, where } from '@angular/fire/firestore';
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

    /**
     * Obtém coleção e armazena em 'things'.
     * 
     * IMPORTANTE!
     * Ao rodar este código pela primeira vez o Firebase vai emitir uma mensagem de erro no console, solicitando a criação de um índice.
     * Logue-se no Firebase e clique no link que aparece no console para que o índice seja gerado.
     * A geração do índice levará alguns minutos.
     **/
    this.things = collectionData(
      query(
        this.fbCollection,            // Referência da coleção.
        where('status', '!=', 'del'), // Somente documentos com status = 'on' ou 'off'.
        orderBy('status', 'desc'),    // Ordena documentos pelo status. Isso é requisito do método 'where()' acima.
        orderBy('date', 'desc')       // Ordena documentos obtidos pela data decrescente.
      ),
      { idField: 'id' }               // Também obtém o Id.
    ) as Observable<any>;

  }

  ngOnInit() { }

}
