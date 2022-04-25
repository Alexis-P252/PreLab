export class Cliente {
    id: Number;
    documento: string;
    nombre: string;
    apellido: string;
    fecha_nac: any;
    direccion: string;
    telefono: string;
    borrado: boolean;

    
    constructor(documento: string, nombre: string, apellido: string, fecha_nac: any, direccion: string, telefono: string, id: Number) {
        this.id = id
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nac = fecha_nac;
        this.direccion = direccion;
        this.telefono = telefono;
        this.borrado = false;
    }

    
}
