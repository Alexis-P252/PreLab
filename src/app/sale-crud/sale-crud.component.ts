import { Component, OnInit } from '@angular/core';
import  { Producto } from '../producto';
import { Cliente } from  '../cliente';
import { Venta } from '../venta';

@Component({
  selector: 'app-sale-crud',
  templateUrl: './sale-crud.component.html',
  styleUrls: ['./sale-crud.component.css']
})
export class SaleCrudComponent implements OnInit {

  clientes: Cliente[] = [];
  currentClient: Cliente = {} as Cliente;

  productos: Producto[] = [];
  currentProduct: Producto = {} as Producto;

  ventas: Venta[] = [];

  fecha: Date = new Date();

  constructor() { }

  listClients(){
    // OBTENGO EL ARREGLO DE CLIENTES DEL LOCAL STORAGE
    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    this.clientes = this.clientes.filter(client => client.borrado == false);
  }

  listProducts(){
    // OBTENGO EL ARREGLO DE PRODUCTOS DEL LOCAL STORAGE
    this.productos = JSON.parse(localStorage.getItem("productos") || "[]");
    this.productos = this.productos.filter(product => product.borrado == false);
  }

  selectClient(client: Cliente){
    this.currentClient = JSON.parse(JSON.stringify(client)) ;
  }

  selectProduct(product: Producto){
    this.currentProduct = JSON.parse(JSON.stringify(product)) ;
  }

  RegistroVenta(fechaString: string){

    if(this.currentClient.id == undefined || this.currentProduct.id == undefined || fechaString == "" ){
      alert("Seleccione un cliente, un producto y una fecha")
    }
    else{
      this.ventas = JSON.parse(localStorage.getItem("ventas") || "[]");
      let id = this.ventas.length;

      
      let venta = new Venta(id, this.currentClient.id, this.currentClient.nombre, this.currentProduct.id, this.currentProduct.nombre, fechaString);
      this.ventas.push(venta);
      localStorage.setItem("ventas", JSON.stringify(this.ventas));
      alert("Venta registrada correctamente");
      this.fecha = new Date();
    }

  }

  ngOnInit(): void {
    this.listClients();
    this.listProducts();
  }



}
