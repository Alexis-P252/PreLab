import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-client-crud',
  templateUrl: './client-crud.component.html',
  styleUrls: ['./client-crud.component.css']
})

export class ClientCrudComponent implements OnInit {

  clientes: Cliente[] = [];
  currentClient: Cliente = {} as Cliente;

  formulario = {
    documento: "",
    nombre: "",
    apellido: "",
    fecha_nac: new Date(),
    direccion: "",
    telefono: "",
  }



  onSaveClient = () => {
    //OBTENER ID AUTOINCREMENTAL
    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    let id = this.clientes.length;
    console.log(id)

    //AGREGAR NUEVO ARREGLO DE CLIENTES
    let nuevoCliente = new Cliente(this.formulario.documento, this.formulario.nombre, this.formulario.apellido, this.formulario.fecha_nac, this.formulario.direccion, this.formulario.telefono, id);
    console.log(nuevoCliente)
    this.clientes.push(nuevoCliente)

    //GUARDAR EN LOCALSTORAGE
    localStorage.setItem("clientes", JSON.stringify(this.clientes));

    //LIMPIAR FORMULARIO
    this.formulario = {
      documento: "",
      nombre: "",
      apellido: "",
      fecha_nac: new Date(),
      direccion: "",
      telefono: "",
    }
  }

  onDeleteClient = () => {

  }

  onEditClient = () => {
    let obj: Cliente = this.clientes.find(o => o.id === this.currentClient.id)!;
    obj.documento = this.currentClient.documento;
    obj.nombre = this.currentClient.nombre;
    obj.apellido = this.currentClient.apellido;
    obj.fecha_nac = this.currentClient.fecha_nac;
    obj.direccion = this.currentClient.direccion;
    obj.telefono = this.currentClient.telefono;
    localStorage.setItem("clientes", JSON.stringify(this.clientes));
    this.hideEditOrDelete();
    

  }

  selectClient(client: Cliente){

    // HAGO UNA COPIA DEL CLIENTE SELECCIONADO EN LA LISTA
    this.currentClient = JSON.parse(JSON.stringify(client)) ;
    document.getElementById("editOrDelete")!.style.display = "flex"; 
    
    
  }

  listClients(){
    // OBTENGO EL ARREGLO DE CLIENTES DEL LOCAL STORAGE
    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  }

  hideEditOrDelete(){
    document.getElementById("editOrDelete")!.style.display = "none"; 
  }

  

  constructor() { }

  ngOnInit(): void {
    this.listClients();
  }

}

