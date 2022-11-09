import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAdminPageRoutingModule } from './inicio-admin-routing.module';

import { InicioAdminPage } from './inicio-admin.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from 'src/app/servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    InicioAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [InicioAdminPage],
  providers: [ProductoService]
})
export class InicioAdminPageModule {}
