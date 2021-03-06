export class Producto {
    id: Number;
    nombre: string;
    descripcion: string;
    precio: Number;
    imagen: string | null;
    borrado: boolean;

    
    constructor(nombre: string, descripcion: string, precio: Number, imagen: string | null, id: Number) {
        this.id = id
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.borrado = false;    
    }
}
