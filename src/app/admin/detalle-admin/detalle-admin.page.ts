import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoConID } from 'src/app/modelo/producto';
import { ProductoService } from 'src/app/servicio/producto.service';

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.page.html',
  styleUrls: ['./detalle-admin.page.scss'],
})
export class DetalleAdminPage implements OnInit {
  public idActiva='';
  public productoActivo!: ProductoConID;

  constructor(
    private productoService: ProductoService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(paramMap =>{
      //redireccionar
      this.idActiva= paramMap.get('idProducto');
      this.productoService.obtenerProductoPorID(+this.idActiva).subscribe(data =>{
        this.productoActivo=data;
      })
    })

  }



}

