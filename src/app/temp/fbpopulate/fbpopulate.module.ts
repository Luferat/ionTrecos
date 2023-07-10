import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FbpopulatePageRoutingModule } from './fbpopulate-routing.module';

import { FbpopulatePage } from './fbpopulate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FbpopulatePageRoutingModule
  ],
  declarations: [FbpopulatePage]
})
export class FbpopulatePageModule {}
