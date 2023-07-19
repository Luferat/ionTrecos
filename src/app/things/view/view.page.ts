import { Component, OnInit, inject } from '@angular/core';
import { DocumentSnapshot, Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // Injeta dependências.
  private activatedRoute = inject(ActivatedRoute);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);

  // Armazena id do documento.
  private docId: string = '';

  // Armazena documento.
  private docSnap !: DocumentSnapshot;

  // Armazena dados do documento para a view.
  public thing: any;

  async ngOnInit() {

    // Recupera o Id da rota.
    this.docId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // Obtém o documento pelo Id.
    this.docSnap = await getDoc(doc(this.firestore, 'things', this.docId));

    // Se encontrou o documento e o status não é 'del'.
    if (this.docSnap.exists() && this.docSnap.data()['status'] != 'del') {

      // Carrehga o documento na view.
      this.thing = this.docSnap.data();

      // Se o documento não foi encontrado ou status é 'del'.
    } else {

      // Não carrega dados na view.
      this.thing = null;

      // Volta para a listagem de documentos.
      this.router.navigate(['/home']);
    }

  }

  /**
   * Altera o status do item.
   */
  changeStatus(newStatus: string) {

    // Mensagem de confirmação.
    if (confirm('Tem certeza que deseja alterar o status deste item?')) {

      // O método 'updateDoc()' do Firestore atualiza um campo de um documento.
      updateDoc(
        doc(this.firestore, 'things', this.docId),  // Referência do documento.
        { 'status': newStatus }                     // campo:valor a ser alterado.
      ).then(() => {                                // Sucesso.
        alert('Status alterado!');                  // Feedback.
        this.thing.status = newStatus;              // Atualiza ngModel.

        // Se o documento foi apagado, redireciona para a listagem de documentos.
        if (this.thing.status === 'del') this.router.navigate(['/home']);
      })
    }

    // Conclui sem fazer mais nada. Isso bloqueia a ação normal dos links <a>...</a>.
    return false;
  }

}
