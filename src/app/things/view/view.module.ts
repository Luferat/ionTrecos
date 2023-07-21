import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewPageRoutingModule } from './view-routing.module';
import { ViewPage } from './view.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ViewPageRoutingModule
  ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
