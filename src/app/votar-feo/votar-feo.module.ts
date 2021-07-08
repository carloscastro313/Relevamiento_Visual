import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotarFeoPageRoutingModule } from './votar-feo-routing.module';

import { VotarFeoPage } from './votar-feo.page';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotarFeoPageRoutingModule,
    UtilityModule
  ],
  declarations: [VotarFeoPage]
})
export class VotarFeoPageModule {}
