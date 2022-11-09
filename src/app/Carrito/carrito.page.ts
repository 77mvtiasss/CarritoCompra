import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from '../modelo/carrito';
import { ProductoService } from '../servicio/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  public idActiva: number = 1;
  public carrito: Carrito;
  public carrito2: Carrito;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private apiProducto: ProductoService,

    private http: HttpClient
  ) {}

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe((parametro) => {
      this.idActiva = +parametro.get('idUsuario');
      this.apiProducto.obtenerCart(this.idActiva).subscribe((datos) => {
        this.carrito = datos;
      });
    });
  }

  // handleRefresh(event) {
  // setTimeout(() =>
  //   this.http.get<any>(`${this.apiProducto.urlCarrito}?idUsuario=${this.idActiva}`).subscribe(data=>{
  //    const carrito = data.find((a:any)=>{
  //   this.Total +=a.total;

  //  })
  // })

  // event.target.complete();
  // }, );
  // };

  ionViewWillEnter() {
    this.http.get<any>(`${this.apiProducto.urlCarrito}?idUsuario=${this.idActiva}`).subscribe(data=>{
      const carrito = data.find((a:any)=>{
      this.Total +=a.total;

       })
  })
}
  public cantidad2 = 0;
  public Total = 0;
  public precioProducto = 0;

  agregarCart(
    nombreProducto: string,
    productoId: number,
    total: number,
    cantidad: number,
    usuarioId: number,
    idCarrito: number
  ) {
    this.cantidad2 = cantidad + 1;
    this.precioProducto = total / cantidad;
    const carrito: Carrito = {
      productoId: productoId,
      nombreProducto: nombreProducto,
      cantidad: cantidad + 1,
      total: this.precioProducto * this.cantidad2,
      usuarioId: usuarioId,
    };

    this.apiProducto.modificarCart(idCarrito, carrito).subscribe((datos) => {
      if (datos) {
        this.apiProducto.obtenerCart(this.idActiva).subscribe((datos) => {
          this.carrito = datos;
        });
      }
    });
  }

  sacarProducto(
    nombreProducto: string,
    productoId: number,
    total: number,
    cantidad: number,
    usuarioId: number,
    idCarrito: number
  ) {
    this.cantidad2 = total / cantidad;
    const carrito: Carrito = {
      productoId: productoId,
      nombreProducto: nombreProducto,
      cantidad: cantidad - 1,
      total: total - this.cantidad2,
      usuarioId: usuarioId,
    };

    if (carrito.cantidad == 0) {
      this.apiProducto.carritoEliminar(idCarrito).subscribe((datos) => {
        if (datos) {
          this.apiProducto.obtenerCart(this.idActiva).subscribe((datos) => {
            this.carrito = datos;
            return (this.Total = 0);
          });
        }
      });
    } else {
      this.apiProducto.modificarCart(idCarrito, carrito).subscribe((datos) => {
        if (datos) {
          this.apiProducto.obtenerCart(this.idActiva).subscribe((datos) => {
            this.carrito = datos;
          });
        }
      });
    }
  }
  cartEliminar() {
    this.http
      .get<any>(`${this.apiProducto.urlCarrito}?idUsuario=${this.idActiva}`)
      .subscribe((data) => {
        const eliminar = data.find((a: any) => {
          this.apiProducto.carritoEliminar(a.id).subscribe((datos) => {
            if (datos) {
              this.apiProducto.obtenerCart(this.idActiva).subscribe((datos) => {
                this.carrito = datos;
                return (this.Total = 0);
              });
            }
          });
        });
      });
  }
}
