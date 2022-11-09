import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, ProductoConID, ProductoParcial } from '../modelo/producto';
import { Usuarios, UsariosConID } from '../modelo/usuarios';
import {  Carrito } from '../modelo/carrito';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = '  http://localhost:3000/producto';
  private paginaActual = 1;
  private comProductos = new BehaviorSubject<Array<ProductoConID>>([]);
  public producto$ = this.comProductos.asObservable();
  public urlUsuarios = '  http://localhost:3000/Usuarios';
  public urlCarrito = '  http://localhost:3000/Carrito';


  private Carrito = [];


  constructor(
    private http: HttpClient
  ) { }
  public obtenerPrimeros10() {
    this.http.get<Array<ProductoConID>>(`${this.url}?_page=1`)
      .subscribe(resultado => {
        this.paginaActual = this.paginaActual + 1;
        this.comProductos.next(resultado);
      })
  }

  public obtenerMasElementos() {
    this.http.get<Array<ProductoConID>>(`${this.url}?_page=${this.paginaActual}`)
      .subscribe(resultado => {
        this.paginaActual = this.paginaActual + 1;
        this.comProductos.next(this.comProductos.getValue().concat(resultado));
      })
  }

  public guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
  public obtenerProductoPorID(id: number): Observable<ProductoConID> {
    return this.http.get<ProductoConID>(`${this.url}/${id}`);
  }
  public borrarProductoPorID(id: number): Observable<ProductoConID> {
    return this.http.delete<ProductoConID>(`${this.url}/${id}`);
  }

  public modificarPorID(id: number, payload: ProductoParcial): Observable<ProductoConID> {
    return this.http.patch<ProductoConID>(`${this.url}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
  public obtenerUsuarioPorID(id): Observable<UsariosConID | null> {
    return this.http.get<UsariosConID | null>(`${this.urlUsuarios}/${id}`);

  }
  public guardarUsario(usuario: Usuarios): Observable<any> {
    return this.http.post(this.urlUsuarios, usuario, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public usuarioNombre(nombre) {
    localStorage.setItem('usuario', nombre);
  }


  public usuarioId(id) {
    localStorage.setItem('ID', id);
  }

  public guardarProductoCart(carrito: Carrito): Observable<any> {
    return this.http.post(this.urlCarrito, carrito, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public eliminarProducCartPorId(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  public carritoEliminar(id: number): Observable<any>{
    return this.http.delete(`${this.urlCarrito}/${id}`)
  }
  public eliminarCompletoCart(id:number): Observable<any>{
    return this.http.delete(`${this.urlCarrito}?usuarioId=${id}`)

  }
  public modificarCart (id: number, payload: Carrito): Observable<any> {
    return this.http.patch(`${this.urlCarrito}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
  public obtenerCart(id: any): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.urlCarrito}?idUsuario=${id}`)
  }
  public retornarId(){
    return localStorage.getItem('ID');
  }






}












