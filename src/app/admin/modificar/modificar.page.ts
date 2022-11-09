import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoParcial } from 'src/app/modelo/producto';
import { ProductoService } from 'src/app/servicio/producto.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  public idActiva = '';
  public formulario: FormGroup;
  public fotoBase64 = '';
  public cargandoFoto = false;
  public productoParcial!: ProductoParcial;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private apiProducto: ProductoService
  ) {
    this.crearFormulario();
  }
  private crearFormulario() {
    this.formulario = this.fb.group({
      // new FormControl()
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      detalle: ['', [Validators.required, Validators.minLength(10)]],
      foto: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      tipoProducto: ['', [Validators.required, Validators.minLength(5)]],
      paisOrigen: ['', [Validators.required, Validators.minLength(4)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      color: ['', [Validators.required, Validators.minLength(4)]],
      garantia: ['', [Validators.required, Validators.minLength(5)]],


    })
  }
  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = parametros.get('idProducto'); // app-routing
      this.apiProducto.obtenerProductoPorID(+this.idActiva)
      .subscribe(producto => {
        this.productoParcial = producto;
        this.fotoBase64 = producto.foto;
        this.formulario.setValue({
          ...this.productoParcial
        });
        this.formulario.updateValueAndValidity();
      })
    });
  }
  public campo(control: string){
    return this.formulario.get(control);
  }
  public fueTocado(control: string){
    return this.formulario.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formulario.get(control).dirty;
  }
  public cargarFoto(evento: Event){
    this.cargandoFoto = true;
    const elemento = (evento.target as HTMLInputElement);
    const archivo = elemento.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onprogress = () => {

    }
    reader.onload = () => {
      this.cargandoFoto = false;
      this.fotoBase64 = reader.result as string;
      console.log('El archivo termino de cargar');
      console.log(reader.result);
    }
    reader.onerror = () => {

    }
  }
  public modificarProducto(){
    if(this.formulario.invalid || this.cargandoFoto){
      this.formulario.markAllAsTouched();
      return;
    }
    this.apiProducto.modificarPorID(+this.idActiva, {
      ...this.formulario.value,
      foto: this.fotoBase64
    })
    .subscribe(cambio => {
      if(cambio){
        this.router.navigate(['']);
        alert('Modificado');
      }
    });
  }
}
