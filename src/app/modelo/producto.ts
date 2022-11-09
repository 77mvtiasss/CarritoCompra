export interface Producto {
  nombre: string;
  detalle: string;
  foto: string;
  precio: number;
  stock: number;
  tipoProducto: string;
  paisOrigen: string;
  marca: string;
  color: string;
  garantia: string;
}
export interface ProductoConID extends Producto{
  id: number;
}
export interface ProductoParcial extends Partial<Producto>{
}
