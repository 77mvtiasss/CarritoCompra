import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductoService } from '../../servicio/producto.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
 public formularioLogin: FormGroup;
   constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    public productoService: ProductoService,
    public http: HttpClient
  ) {
    this.construirFormulario();

   }
   private construirFormulario (): void {
    this.formularioLogin = this.fb.group({
      // new FormControl()
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      contraseña: ['', [Validators.required, Validators.minLength(5)]],

    })
  }

  ngOnInit() {
  }
  public camp(control: string) {
    return this.formularioLogin.get(control);
  }

    async login() {
      if (this.formularioLogin.invalid) {
        return;
      }
      else {
        this.http.get<any>(this.productoService.urlUsuarios).subscribe(data=>{
          const user = data.find((a:any)=>{
            return a.nombre === this.formularioLogin.value.nombre &&
            a.contraseña === this.formularioLogin.value.contraseña

          });
          if(user){
            this.formularioLogin.reset();

          if(user.nombre.toLowerCase() ==="admin"){
            alert("Usuario no valido ")
            return;


          }
            else {
              this.productoService.usuarioNombre(user.nombre);
              this.productoService.usuarioId(user.id);
              this.router.navigate(['ListarProducto']);
            }
          }
          else{
            alert("Usario no existe :(")
            return;
          }
        })
      }

    }


  }


