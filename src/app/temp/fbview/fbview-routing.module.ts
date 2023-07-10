import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FbviewPage } from './fbview.page';

const routes: Routes = [
  {
    path: '',
    component: FbviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FbviewPageRoutingModule {}
