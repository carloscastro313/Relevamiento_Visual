import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotarFeoPage } from './votar-feo.page';

const routes: Routes = [
  {
    path: '',
    component: VotarFeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotarFeoPageRoutingModule {}
