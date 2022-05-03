import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { DataService } from '../data.service';

@Component({
  selector: 'app-client-crud',
  templateUrl: './client-crud.component.html',
  styleUrls: ['./client-crud.component.css']
})

export class ClientCrudComponent implements OnInit {

  data :DataService = new DataService();
  clientes: Cliente[] = [];
  currentClient: Cliente = {} as Cliente;

  formulario = {
    documento: "",
    nombre: "",
    apellido: "",
    fecha_nac: null,
    direccion: "",
    telefono: "",
  }



  onSaveClient = () => {
    //OBTENER ID AUTOINCREMENTAL
    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    let id = this.clientes.length;

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
      fecha_nac: null,
      direccion: "",
      telefono: "",
    }

    //RECARGAR LISTA DE CLIENTES
    this.clientes =  this.data.getClientes();

    //OBTENER DIV ALERTA DOM
    let alerta = document.getElementById("client-confirmation")!;
    alerta.innerHTML = "Cliente registrado correctamente";
    alerta.style.display = "flex";

    //MOSTRAR ALERTA POR 5 SEGUNDOS
    setTimeout(() => {
      alerta.style.display = "none";
    }, 5000);
  }

  //ELIMINAR CLIENTE
  deleteClient(){
  
    this.data.deleteCliente(this.currentClient.id)
  
    //RECARGO LA LISTA DE CLIENTES
    this.clientes =  this.data.getClientes();

    //ESCONDO EL FORMULARIO DE EDICION O BORRADO
    this.hideEditOrDelete();

    //OBTENER DIV ALERTA DOM
    let alerta = document.getElementById("client-confirmation")!;
    alerta.innerHTML = "Cliente eliminado correctamente";
    alerta.style.display = "flex";

    //MOSTRAR ALERTA POR 5 SEGUNDOS
    setTimeout(() => {
      alerta.style.display = "none";
    }, 5000);
  }

  //VALIDAR FORMULARIO DE REGISTRO
  validarFormulario(){
    if(this.formulario.documento == "" || this.formulario.nombre == "" || this.formulario.apellido == "" || this.formulario.fecha_nac == null || this.formulario.direccion == "" || this.formulario.telefono == ""){
      return false;
    }else{
      return true;
    }
  }

    //VALIDAR FORMULARIO DE EDICION
  validarFormularioEdit(){
    if(this.currentClient.documento == "" || this.currentClient.nombre == "" || this.currentClient.apellido == "" || this.currentClient.fecha_nac == null || this.currentClient.direccion == "" || this.currentClient.telefono == ""){
      return false;
    }else{
      return true;
    }
  }


  //EDITAR CLIENTE
  onEditClient = () => {
     this.data.editCliente(this.currentClient);
    this.hideEditOrDelete();
    
    //OBTENER DIV ALERTA DOM
    let alerta = document.getElementById("client-confirmation")!;
    alerta.innerHTML = "Cliente editado correctamente";
    alerta.style.display = "flex";

    //MOSTRAR ALERTA POR 5 SEGUNDOS
    setTimeout(() => {
      alerta.style.display = "none";
    }, 5000);
  }


  //SELECCIONAR CLIENTE
  selectClient(client: Cliente){

    // HAGO UNA COPIA DEL CLIENTE SELECCIONADO EN LA LISTA
    this.currentClient = JSON.parse(JSON.stringify(client)) ;
    document.getElementById("editOrDelete")!.style.display = "flex"; 
    console.log(this.currentClient);
    
  }



  //ESCONDER FORMULARIO DE EDICION O BORRADO
  hideEditOrDelete(){
    document.getElementById("editOrDelete")!.style.display = "none"; 
  }
  

  constructor() { }

  ngOnInit(): void {
    this.clientes =  this.data.getClientes();
    
  }

}

