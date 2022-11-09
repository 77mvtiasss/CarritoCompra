import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProductoPageRoutingModule } from './detalle-producto-routing.module';

import { DetalleProductoPage } from './detalle-producto.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from 'src/app/servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProductoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [DetalleProductoPage],
  providers:[ProductoService]
})
export class DetalleProductoPageModule {}
