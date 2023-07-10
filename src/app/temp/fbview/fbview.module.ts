import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FbviewPageRoutingModule } from './fbview-routing.module';

import { FbviewPage } from './fbview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FbviewPageRoutingModule
  ],
  declarations: [FbviewPage]
})
export class FbviewPageModule {}
