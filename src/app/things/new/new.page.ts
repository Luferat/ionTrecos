import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  form!: FormGroup;
  contact!: any;
  success: boolean = false;
  defaultImage = 'assets/generic.png';
  photoFormat = '';
  userData: any;
  saving = false;

  private storage: Storage = inject(Storage);
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  public photoURL: any;
  formCollection = collection(this.firestore, 'things');

  authState = authState(this.auth);
  authStateSubscription = new Subscription;

  validationMessages: any = {
    name: {
      required: 'O nome é obrigatório.',
      minlength: 'O nome está muito curto.'
    },
    description: {
      required: 'A descrição é obrigatória.',
      minlength: 'A descrição está muito curta.'
    },
    location: {
      required: 'A localização é obrigatória.',
      minlength: 'A localização está muito curta.'
    }
  }

  formErrors: any = {
    name: '',
    description: '',
    location: ''
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.success = false;

    // Quando o formulário for editado, executa 'updateValidationMessages()'.
    this.form.valueChanges.subscribe(() => {
      this.updateValidationMessages();
    });

    // Observer que obtém status de usuário logado.
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {

        // Se tem alguém logado.
        if (userData) {

          // Preenche os campos 'nome' e 'email'.
          this.form.controls['userId'].setValue(userData.uid);
        }
      }
    );
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      image: [this.defaultImage],
      userId: ['']
    });
  }

  // Valida o preenchimento dos campos do formulário em tempo real.
  updateValidationMessages() {
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = this.form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // Obtém uma foto da API da câmera.
  getPhoto() {
    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      // Retorna o arquivo da câmera no formato 'BASE64' (jpg).
      resultType: CameraResultType.DataUrl
    }).then((x) => {
      this.form.controls['image'].setValue(x.dataUrl);
      this.photoFormat = x.format;
    })
  }

  // Gera um nome aleatório.
  getRandomChars(n: number) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let sequence = '';
    for (let i = 0; i < n; i++) {
      const rndi = Math.floor(Math.random() * chars.length);
      sequence += chars.charAt(rndi);
    }
    return sequence;
  }

  // Salva a foto atual.
  sendForm() {

    this.saving = true;

    // Se atualizou a foto.
    if (this.form.controls['image'].value !== this.defaultImage) {

      // Cria um nome aleatório para a foto.
      let storageRef = ref(this.storage, `${this.getRandomChars(10)}.${this.photoFormat}`);

      // Envia a foto para o servidor.
      uploadString(
        storageRef,
        this.form.controls['image'].value.split(',')[1],
        'base64',
        { contentType: `image/${this.photoFormat}` }
      ).then(() => {
        // Se salvou a imagem, obtém o URL e salva no campo 'image' do formulário.
        getDownloadURL(ref(storageRef))
          .then((response) => {
            this.form.controls['image'].setValue(response);
            this.saveForm();
          })
      });

    } else {
      this.saveForm();
    }
  }

  saveForm() {
    let formData = this.form.value;
    const d = new Date();
    formData.date = d.toISOString().split('.')[0].replace('T', ' ');
    formData.status = 'on';
    console.log(formData);

    // Salva contato no Firestore.
    addDoc(this.formCollection, formData)
      .then((data) => {
        console.log('Item salvo com Id :' + data.id)
        this.success = true;
      })
  }

  reload() {
    this.form.reset();
    this.form.controls['image'].setValue(this.defaultImage);
    this.success = false;
    this.saving = false;
  }

}
