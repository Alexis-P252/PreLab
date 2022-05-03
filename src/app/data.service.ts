import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  clientes: Cliente[] = [];
  productos: Producto[] = []; ;
  ventas: any;

  constructor() { }

  getClientes(): any{

    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    this.clientes = this.clientes.filter(client => client.borrado == false);
    return this.clientes;
  }

  editCliente(client: Cliente){
    let obj: Cliente = this.clientes.find(o => o.id === client.id)!;
    obj.documento = client.documento;
    obj.nombre = client.nombre;
    obj.apellido = client.apellido;
    obj.fecha_nac = client.fecha_nac;
    obj.direccion = client.direccion;
    obj.telefono = client.telefono;
    localStorage.setItem("clientes", JSON.stringify(this.clientes));
  }

  deleteCliente(id: Number){
    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

    //BUSCO EL CLIENTE A ELIMINAR
    let index = this.clientes.findIndex(c => c.id == id);

    //ELIMINO EL CLIENTE
    this.clientes[index].borrado = true;

    //GUARDO EL ARREGLO DE CLIENTES EN EL LOCAL STORAGE
    localStorage.setItem("clientes", JSON.stringify(this.clientes));

  }

  getProductos(): any{
    this.productos = JSON.parse(localStorage.getItem("productos") || "[]");
    this.productos = this.productos.filter(product => product.borrado == false);
    return this.productos;
  
  }

  editProducto(product: Producto){
    let obj: Producto = this.productos.find(o => o.id === product.id)!;
    obj.nombre = product.nombre;
    obj.descripcion = product.descripcion;
    obj.precio = product.precio;
  
    localStorage.setItem("productos", JSON.stringify(this.productos));
  }

  deleteProducto(id: Number){
     // OBTENGO EL ARREGLO DE PRODUCTOS DEL LOCAL STORAGE
     this.productos = this.getProductos();

     //BUSCO EL PRODUCTO A ELIMINAR
     let index = this.productos.findIndex(product => product.id == id);
 
     //ELIMINO EL PRODUCTO
     this.productos[index].borrado = true;
 
     //GUARDO EL ARREGLO DE PRODUCTOS EN EL LOCAL STORAGE
     localStorage.setItem("productos", JSON.stringify(this.productos));
  }
  
}
