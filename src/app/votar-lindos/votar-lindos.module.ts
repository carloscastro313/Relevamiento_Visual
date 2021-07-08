import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotarLindosPageRoutingModule } from './votar-lindos-routing.module';

import { VotarLindosPage } from './votar-lindos.page';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotarLindosPageRoutingModule,
    UtilityModule
  ],
  declarations: [VotarLindosPage]
})
export class VotarLindosPageModule {}
