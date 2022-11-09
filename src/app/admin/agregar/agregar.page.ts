import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../servicio/producto.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  public formulario: FormGroup;
  public fotoBase64 = '';
  public cargandoFoto = false;
  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.construirFormulario();
  }
  private construirFormulario(): void {
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
  ngOnInit() {
  }

  public guardarProducto(): void {
    if(this.formulario.invalid || this.cargandoFoto){
      this.formulario.markAsTouched();
      return;
    }
    this.productoService.guardarProducto({
      ...this.formulario.value,
      foto: this.fotoBase64
    })
    .subscribe(datos => {
      if(datos){
        alert('Producto Agregado :D');
        this.router.navigate(['listarProduAdmin']);
      }
    })
  }
}
