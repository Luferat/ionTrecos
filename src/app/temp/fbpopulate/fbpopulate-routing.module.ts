import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FbpopulatePage } from './fbpopulate.page';

const routes: Routes = [
  {
    path: '',
    component: FbpopulatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FbpopulatePageRoutingModule {}
