import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../servicio/producto.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  public formulario: FormGroup;
  public imagenBase64 = '';
  public cargandoImagen = false;
  constructor(
    private fb: FormBuilder,
    private apiProducto: ProductoService,
    private router: Router
  ) {
    this.construirFormulario();
  }
  private construirFormulario(): void {
    this.formulario = this.fb.group({
      // new FormControl()
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      contraseña: ['', [Validators.required, Validators.minLength(5)]],

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

  ngOnInit() {
  }
  public  guardarUsario(): void {
    if(this.formulario.invalid ){
      this.formulario.markAsTouched();
      return;
    }
    this.apiProducto. guardarUsario({
      ...this.formulario.value
    })
    .subscribe(datos => {
      if(datos){
        alert('Usuario Creado!!:D');
        this.router.navigate(['']);
      }
    })
  }
}

