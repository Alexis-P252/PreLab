export class Venta {
    id: Number;
    id_cliente: Number;
    nombre_cliente: string;
    id_producto: Number;
    nombre_producto: string;
    fecha: any;
    
    constructor(id: Number, id_cliente: Number, nombre_cliente: string, id_producto: Number, nombre_producto: string, fecha: any) {
        this.id = id
        this.id_cliente = id_cliente;
        this.nombre_cliente = nombre_cliente;
        this.id_producto = id_producto;
        this.nombre_producto = nombre_producto;
        this.fecha = fecha;
    }

    
}
