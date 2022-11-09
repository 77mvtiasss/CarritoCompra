export interface Usuarios {
  nombre: string;
  contraseña:string;
}
export interface UsariosConID extends Usuarios{
  id: number;
}
