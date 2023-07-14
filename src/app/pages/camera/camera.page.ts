import { Component, OnInit, inject } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage, ref, uploadBytesResumable, uploadString } from '@angular/fire/storage';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  public photoURL: any;
  public photoFormat = '';

  private storage: Storage = inject(Storage);

  getPhoto() {

    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    }).then((x) => {
      console.log('Foto escolhida: ', x);
      this.photoURL = x.dataUrl;
      this.photoFormat = x.format;
    })

  }

  ngOnInit() { }

  refresh(): void {
    this.photoURL = undefined;
  }

  savePhoto() {
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const storageRef = ref(this.storage, `${randomString}.${this.photoFormat}`);
    uploadString(
      storageRef,
      this.photoURL.split(',')[1],
      'base64',
      { contentType: `image/${this.photoFormat}` }
    ).then(() => { 
      alert('Imagem salva com sucesso!');
    });
  }

}
