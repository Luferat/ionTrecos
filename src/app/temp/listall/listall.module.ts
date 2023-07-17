import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListallPageRoutingModule } from './listall-routing.module';

import { ListallPage } from './listall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListallPageRoutingModule
  ],
  declarations: [ListallPage]
})
export class ListallPageModule {}
