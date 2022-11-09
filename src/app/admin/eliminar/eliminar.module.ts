import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarPageRoutingModule } from './eliminar-routing.module';

import { EliminarPage } from './eliminar.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from 'src/app/servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [EliminarPage],
  providers: [ProductoService]
})
export class EliminarPageModule {}
