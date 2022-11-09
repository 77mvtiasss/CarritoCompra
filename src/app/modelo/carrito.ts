import { Producto, ProductoConID } from "./producto";
import { Usuarios,UsariosConID} from "./usuarios";

export interface Carrito {
      productoId: number;
      usuarioId: number ;
      nombreProducto: string;
      cantidad: number;
      total: number
}

