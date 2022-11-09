import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ('./login/iniciar-sesion/iniciar-sesion.module').then(m=> m.IniciarSesionPageModule)
   },
   {
    path:'registrar',
    loadChildren: ()=> import ('./login/registrar/registrar.module').then(m=> m.RegistrarPageModule)
   },
 {
  path: 'ListarProducto',
  loadChildren: () => import('./usuarioNormal/listar-producto/listar-producto.module').then(m=> m.ListarProductoPageModule)
 },
 {
  path:'detalleProducto/:idProducto',
  loadChildren: () => import ('./usuarioNormal/detalle-producto/detalle-producto.module').then(m=> m.DetalleProductoPageModule)
 },
 {
  path: 'listarProduAdmin',
  loadChildren:() => import('./admin/listar-admin/listar-admin.module').then(m=> m.ListarAdminPageModule )
 },
 {
  path:'detalleProduAdmin/:idProducto',
  loadChildren:()=> import('./admin/detalle-admin/detalle-admin.module').then(m=> m.DetalleAdminPageModule)
 },
 {
  path:'agregar',
  loadChildren:()=> import('./admin/agregar/agregar.module').then(m=> m.AgregarPageModule)
 },
 {
  path: 'eliminar/:idProducto',
  loadChildren:() => import('./admin/eliminar/eliminar.module').then(m=> m.EliminarPageModule)
 },
 {
  path:'modificar/:idProducto',
  loadChildren:()=> import('./admin/modificar/modificar.module').then(m=> m.ModificarPageModule)
 },
  {
    path: 'inicio-admin',
    loadChildren: () => import('./admin/login-admin/inicio-admin/inicio-admin.module').then( m => m.InicioAdminPageModule)
  },

  {
    path: 'carrito/:idUsuario',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
