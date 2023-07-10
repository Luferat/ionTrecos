import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FblistPageRoutingModule } from './fblist-routing.module';

import { FblistPage } from './fblist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FblistPageRoutingModule
  ],
  declarations: [FblistPage]
})
export class FblistPageModule {}
