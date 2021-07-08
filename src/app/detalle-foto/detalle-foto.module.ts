import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleFotoPageRoutingModule } from './detalle-foto-routing.module';

import { DetalleFotoPage } from './detalle-foto.page';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleFotoPageRoutingModule,
    UtilityModule
  ],
  declarations: [DetalleFotoPage]
})
export class DetalleFotoPageModule {}
