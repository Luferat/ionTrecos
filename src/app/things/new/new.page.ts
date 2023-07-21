import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  /**
   * Injeta dependências.
   */
  private storage: Storage = inject(Storage);                 // Firebase Storage.
  private auth: Auth = inject(Auth);                          // Firebase Authentication.
  private firestore: Firestore = inject(Firestore);           // Firebase Firestore.
  private formBuilder: FormBuilder = inject(FormBuilder);     // Construtor de formulários do Angular.    
  private services: GeneralService = inject(GeneralService);  // Serviços de uso geral.

  /**
   * Atributos de uso geral.
   */
  private defaultImage = 'assets/generic.png';  // Imagem padrão para um novo item.
  private photoFormat = '';                     // Formato da foto obtida da câmera.

  /**
   * Atributos da view.
   * São usados no HTML do componente.
   */
  public form!: FormGroup;          // Cria um formulário do tipo Angular Reactive Forms.
  public success: boolean = false;  // Controla a view → Feedback de confirmação do envio.
  public saving = false;            // Controla a view → Desabilita botão [SALVAR].

  /**
   * Atributos do Firebase.
   */
  private formCollection = collection(this.firestore, 'things');  // Define a coleção do Firestore.
  private authState = authState(this.auth);                       // Obtém status atual do usuário logado.
  private authStateSubscription = new Subscription;               // Observer para casos em que usuário muda o status.

  // Mensagens de erro de preenchimento do formulário.
  // É usado por 'updateValidationMessages()'.
  validationMessages: any = {
    name: { required: 'O nome é obrigatório.', minlength: 'O nome está muito curto.' },
    description: { required: 'A descrição é obrigatória.', minlength: 'A descrição está muito curta.' },
    location: { required: 'A localização é obrigatória.', minlength: 'A localização está muito curta.' }
  }

  // Contém as mensagens de erro de cada campo do formulário.
  // É usado por 'updateValidationMessages()'.
  formErrors: any = { name: '', description: '', location: '' }

  ngOnInit() {

    // Cria o novo formulário.
    this.createForm();

    // Controla a view de feedback de envio.
    this.success = false;

    // Quando um campo do formulário for editado, executa 'updateValidationMessages()' para mostrar mensagens de erro.
    this.form.valueChanges.subscribe(() => {
      this.services.updateValidationMessages(this.form, this.formErrors, this.validationMessages);
    });

    // Observer que obtém status de usuário logado.
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {

        // Se tem alguém logado, 'userData' não é null.
        if (userData) {

          // Armazena o Id do usuário no formulário.
          this.form.controls['userId'].setValue(userData.uid);
        }
      }
    );
  }

  // Cria o formulário usando o FormBuilder do Angular Reactive Forms.
  // Também injeta as devidas validações para cada campo.
  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],         // Obrigatório, com pelo menos 3 caracteres.
      description: ['', [Validators.required, Validators.minLength(3)]],  // Obrigatório, com pelo menos 3 caracteres.
      location: ['', [Validators.required, Validators.minLength(3)]],     // Obrigatório, com pelo menos 3 caracteres.
      image: [this.defaultImage],                                         // Carrega a imagem padrão.
      userId: ['']                                                        // O Id será atualizado por 'ngOnInit()'.
    });
  }

  /**
   * Obtém uma foto da API da câmera (Capacitor) quando clica no botão [ALTERAR].
   * Referências: https://capacitorjs.com/docs/apis/camera
   **/
  getPhoto() {
    Camera.getPhoto({                                   // 'getPhoto()' é uma promise.
      quality: 90,                                      // Qualidade da foto.
      allowEditing: true,                               // Pode editar a foto antes de salvar.
      resultType: CameraResultType.DataUrl              // Retorna o arquivo da câmera no formato 'BASE64' (jpg).
    }).then((x) => {                                    // Obteve a foto com sucesso.
      this.form.controls['image'].setValue(x.dataUrl);  // Obtém o BASE64 da foto.
      this.photoFormat = x.format;                      // Obtém o formato da foto.
    })
  }

  // Salva a foto atual.
  sendForm() {

    // Bloqueia o botão [SALVAR] para evitar duplo clique.
    this.saving = true;

    // Se atualizou a foto, ou seja, não está usando a foto padrão.
    if (this.form.controls['image'].value !== this.defaultImage) {

      // Cria um nome aleatório para a foto usando 'getRandomChars()' e adiciona o formato.
      let storageRef = ref(this.storage, `${this.services.getRandomChars(10)}.${this.photoFormat}`);

      /**
       * Envia a foto para o servidor no formato 'String/Base64'.
       * Referências: https://firebase.google.com/docs/storage/web/upload-files?hl=pt-br
       **/ 
      uploadString(
        storageRef,                                      // Dome da imagem.
        this.form.controls['image'].value.split(',')[1], // Dados da imagem.
        'base64',                                        // Formato dos dados.
        { contentType: `image/${this.photoFormat}` }     // Formato da foto.
      ).then(() => {

        /**
         * Se salvou a imagem, obtém a URL desta.
         * Referências: https://firebase.google.com/docs/storage/web/download-files?hl=pt-br#download_data_via_url
         **/ 
        getDownloadURL(ref(storageRef))
          .then((response) => {

            // Salva a URL no campo 'image' do formulário.
            this.form.controls['image'].setValue(response);

            // Envia o formulário para o Firestore.
            this.saveForm();
          })
      });

      // Se não alterou a foto.
    } else {

      // Mantém a foto padrão e envia o formulário para o Firestore.
      this.saveForm();
    }
  }

  // Envia o formulário para o Firestore.
  saveForm() {
    let formData = this.form.value;                                   // Obtém todos os campos para 'formData'.
    const d = new Date();                                             // Obtém a data atual.
    formData.date = d.toISOString().split('.')[0].replace('T', ' ');  // Formata a data para 'ISO/System date' no campo 'date'.
    formData.status = 'on';                                           // Define o campo 'status' do item cadastrado.

    // Salva contato no Firestore (promise).
    addDoc(this.formCollection, formData)
      .then((data) => {
        console.log('Item salvo com Id :' + data.id)
        this.success = true;  // Atualiza a view, exibindo o feedback.
      })
  }

  // Ao clicar no botão [NOVO].
  reload() {
    this.form.reset();                                        // Reinicia o formulário.
    this.form.controls['image'].setValue(this.defaultImage);  // Carrega a foto padrão.
    this.success = false;                                     // Atualiza a view, exibindo o formulário.  
    this.saving = false;                                      // Libera o botão [SALVAR].
  }

  // Ao clicar no botão [PADRÃO].
  setDefaultImage() {

    // Carrega a imagem padrão no campo imagem.
    this.form.controls['image'].setValue(this.defaultImage);
  }
}
