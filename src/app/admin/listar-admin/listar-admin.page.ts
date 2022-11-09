import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ProductoConID } from 'src/app/modelo/producto';
import { ProductoService } from 'src/app/servicio/producto.service';

@Component({
  selector: 'app-listar-admin',
  templateUrl: './listar-admin.page.html',
  styleUrls: ['./listar-admin.page.scss'],
})
export class ListarAdminPage implements OnInit {
  public scroll: IonInfiniteScroll;
  public listaProductos: Array<ProductoConID> = [];
  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.productoService.obtenerPrimeros10();
    this.productoService.producto$.subscribe(productos => {
      this.listaProductos = productos;
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }
  public cargarMasDatos(){
    this.productoService.obtenerMasElementos();
  }

}


