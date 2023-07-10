import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FblistPage } from './fblist.page';

const routes: Routes = [
  {
    path: '',
    component: FblistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FblistPageRoutingModule {}
