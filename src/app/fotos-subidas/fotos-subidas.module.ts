import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosSubidasPageRoutingModule } from './fotos-subidas-routing.module';

import { FotosSubidasPage } from './fotos-subidas.page';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosSubidasPageRoutingModule,
    UtilityModule
  ],
  declarations: [FotosSubidasPage]
})
export class FotosSubidasPageModule {}
