import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListallPage } from './listall.page';

const routes: Routes = [
  {
    path: '',
    component: ListallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListallPageRoutingModule {}
