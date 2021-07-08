import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
const routes: Routes = [

  {
    path: '',
    component: HomePage,
    children: [
      {
        path:'',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'cosas-feas',
        loadChildren: () => import('../cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
      },
      {
        path: 'cosas-lindas',
        loadChildren: () => import('../cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
      },
      {
        path: 'votar-feo/:correo/:id',
        loadChildren: () => import('../votar-feo/votar-feo.module').then( m => m.VotarFeoPageModule)
      },
      {
        path: 'votar-lindos/:correo/:id',
        loadChildren: () => import('../votar-lindos/votar-lindos.module').then( m => m.VotarLindosPageModule)
      },
      {
        path: 'fotos-subidas',
        loadChildren: () => import('../fotos-subidas/fotos-subidas.module').then( m => m.FotosSubidasPageModule)
      },
      {
        path: 'fotos-subidas/:tipo/:id',
        loadChildren: () => import('../detalle-foto/detalle-foto.module').then( m => m.DetalleFotoPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
