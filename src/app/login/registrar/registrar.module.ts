import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistrarPage],
  providers: [ProductoService]
})
export class RegistrarPageModule {}
