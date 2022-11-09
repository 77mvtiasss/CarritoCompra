import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPageRoutingModule } from './agregar-routing.module';

import { AgregarPage } from './agregar.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AgregarPage],
  providers: [ ProductoService]
})
export class AgregarPageModule {}
