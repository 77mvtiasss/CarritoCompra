import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarAdminPageRoutingModule } from './listar-admin-routing.module';

import { ListarAdminPage } from './listar-admin.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from 'src/app/servicio/producto.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListarAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarAdminPage],
  providers: [ProductoService]
})
export class ListarAdminPageModule {}
