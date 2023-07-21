import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { DocumentSnapshot, Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  // Injeta dependências.
  private activatedRoute = inject(ActivatedRoute);

  public docId: string = '';

  ngOnInit() {

    // Recupera o Id d documento na rota.
    this.docId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    console.log(this.docId);

  }

}
