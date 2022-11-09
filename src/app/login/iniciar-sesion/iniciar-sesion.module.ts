import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarSesionPageRoutingModule } from './iniciar-sesion-routing.module';

import { IniciarSesionPage } from './iniciar-sesion.page';
import { ProductoService } from '../../servicio/producto.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IniciarSesionPageRoutingModule,
    HttpClientModule
  ],
  declarations: [IniciarSesionPage],
  providers:[ProductoService]
})
export class IniciarSesionPageModule {}
