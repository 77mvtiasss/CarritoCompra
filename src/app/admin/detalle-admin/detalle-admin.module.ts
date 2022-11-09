import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAdminPageRoutingModule } from './detalle-admin-routing.module';

import { DetalleAdminPage } from './detalle-admin.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from 'src/app/servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [DetalleAdminPage],
  providers: [ProductoService]
})
export class DetalleAdminPageModule {}
