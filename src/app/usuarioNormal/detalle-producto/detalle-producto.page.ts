import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductoConID } from './../../modelo/producto';
import { ProductoService } from '../../servicio/producto.service';
import { HttpClient } from '@angular/common/http';
import { Carrito } from 'src/app/modelo/carrito';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  public idActiva: number =0;
  public productoActivo!: ProductoConID;
  public usuarioActivo = this.apiProducto.retornarId();
  public formulario: FormGroup
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private apiProducto: ProductoService,
    private alerta: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = +parametros.get('idProducto');
      this.apiProducto.obtenerProductoPorID(this.idActiva)
        .subscribe(data => {
          if(data){
            this.productoActivo = data;
          } else{
            this.router.navigate(['']);
          }

        })
    });

  }
  public id = this.apiProducto.retornarId();
  public cantidad2: number = 0;

  tieneProductoCart(productoNomb: string) {
    this.http.get<any>(this.apiProducto.urlCarrito).subscribe(data => {
      const producto = data.find((a: any) => {
        return a.usuarioId == this.id && a.productoId == this.idActiva
      });
      if (producto) {
        this.cantidad2 = producto.cantidad + 1
        const carrito: Carrito = {
          "productoId": producto.productoId,
          "usuarioId": producto.usuarioId,
          "nombreProducto": productoNomb,
          "cantidad": producto.cantidad + 1,
          "total": this.productoActivo.precio * this.cantidad2


        }
        this.apiProducto.modificarCart(producto.id, carrito).subscribe(data => {
          alert("Producto agregado al carro :)")
          this.router.navigate(['ListarProducto'])
        })
      }
      else {
        const carrito : Carrito = {
          "productoId": this.idActiva,
          "usuarioId": parseInt(this.apiProducto.retornarId()),
          "nombreProducto": productoNomb,
          "cantidad": 1,
          "total": this.productoActivo.precio

        }
        this.apiProducto.guardarProductoCart({
           ...carrito
        }).subscribe(data=>{
          alert("Producto agregado :)")
          this.router.navigate(['ListarProducto'])
        })
      }


    })

  }

}





