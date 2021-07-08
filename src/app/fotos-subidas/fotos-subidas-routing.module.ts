import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosSubidasPage } from './fotos-subidas.page';

const routes: Routes = [
  {
    path: '',
    component: FotosSubidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosSubidasPageRoutingModule {}
