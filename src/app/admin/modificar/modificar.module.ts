import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPageRoutingModule } from './modificar-routing.module';

import { ModificarPage } from './modificar.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from 'src/app/servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
   ReactiveFormsModule,
    IonicModule,
    ModificarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModificarPage],
  providers: [ProductoService]
})
export class ModificarPageModule {}
