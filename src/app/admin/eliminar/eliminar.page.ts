import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductoConID } from 'src/app/modelo/producto';
import { ProductoService } from 'src/app/servicio/producto.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  public idActiva = '';
  public productoActivo!: ProductoConID;
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private apiProducto: ProductoService,
    private alerta: AlertController
  ) { }

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = parametros.get('idProducto');
      this.apiProducto.obtenerProductoPorID(+this.idActiva)
        .subscribe(producto => {
          if (!producto) {
            this.router.navigate(['listarProduAdmin']);
            return;
          }
          this.productoActivo = producto;
        })
    })
  }

  public async borrarProducto() {
    const mensaje = await this.alerta.create({
      header: 'Seguro quieres borrar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmo',
          role: 'confirm',
          handler: () => {
            this.apiProducto.borrarProductoPorID(+this.idActiva)
              .subscribe()
            this.router.navigate(['listarProduAdmin']);
          }

        }
      ]
    });
    await mensaje.present();
  }

}
