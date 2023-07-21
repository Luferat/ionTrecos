import { Component, OnInit, inject } from '@angular/core';
import { DocumentSnapshot, Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  private alertController: AlertController = inject(AlertController);

  // Armazenará id do documento.
  public docId: string = '';

  // Armazenará o documento.
  private docSnap !: DocumentSnapshot;

  // Armazenará dados do documento para a view.
  public thing: any;

  async ngOnInit() {

    // Recupera o Id d documento na rota.
    this.docId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    /**
     * Obtém o documento do Firestore pelo Id.
     * Referências: https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt&authuser=0#get_a_document
     **/
    this.docSnap = await getDoc(doc(this.firestore, 'things', this.docId));

    // Se encontrou o documento e o status não é 'del' (apagado).
    if (this.docSnap.exists() && this.docSnap.data()['status'] !== 'del') {

      // Carrega o documento na view.
      this.thing = this.docSnap.data();
      this.thing.id = this.docId;

      // Se o documento não foi encontrado ou status é 'del' (apagado).
    } else {

      // Não carrega dados na view.
      this.thing = null;

      // Volta para a listagem de documentos.
      this.router.navigate(['/home']);
    }

  }

  /**
   * Caixa de mensagem do Angular.
   * Referências: https://ionicframework.com/docs/api/alert
   **/
  async presentAlert(newStatus: string, newStatusMsg: string) {
    const alert = await this.alertController.create({
      header: 'Atenção!',

      // Mensagem a ser exibida na caixa.
      message: newStatusMsg,
      buttons: [

        // Se clicar no botão [Cancelar], nada acontece.
        { text: 'Cancelar', role: 'cancel', handler: () => { return false; } },

        // Se clicar no botão [Ok], chama o método 'handlerStatus()'.
        { text: 'OK', role: 'confirm', handler: () => { this.handlerStatus(newStatus); } },
      ],
    });

    // Mostra a caixa.
    await alert.present();
  }

  /**
   * Altera o status do item ao clicar na view.
   **/
  changeStatus(newStatus: string) {

    // Conterá a mensagem para o usuário.
    let newStatusMsg = '';

    // Define a mensagem de alerta conforme o novo status.
    switch (newStatus) {
      case 'on': newStatusMsg = 'Tem certeza que deseja ativar este registro?'; break;
      case 'off': newStatusMsg = 'Tem certeza que deseja desativar este registro?'; break;
      case 'del': newStatusMsg = 'Tem certeza que deseja apagar este registro? Essa ação é permanente e não pode ser desfeita!'; break;
      default: return false;
    }

    // Abre caixa de mensagem do Angular, criada em 'presentAlert()'.
    let response = this.presentAlert(newStatus, newStatusMsg);

    // Conclui sem fazer mais nada. Isso bloqueia a ação normal dos links <a>...</a>.
    return false;
  }

  // Altera o status do registro.
  handlerStatus(newStatus: string) {

    /**
     * O método 'updateDoc()' do Firestore atualiza um campo de um documento sem alterar os outros.
     * Equivale a um 'HTTP:PATCH'. 
     * Referências: https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt&authuser=0#update-data
     **/
    updateDoc(
      doc(this.firestore, 'things', this.docId),  // Referência do documento.
      { 'status': newStatus }                     // campo:valor a ser alterado.
    ).then(() => {                                // Sucesso.
      this.thing.status = newStatus;              // Atualiza ngModel.

      // Se o documento foi apagado, redireciona para a listagem de documentos ('home').
      if (this.thing.status === 'del') this.router.navigate(['/home']);
    })

    // Conclui sem fazer mais nada. Isso bloqueia a ação normal dos links <a>...</a>.
    return false;
  }

}
