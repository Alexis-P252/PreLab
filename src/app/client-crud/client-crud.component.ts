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
    this.listClients();

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
    // OBTENGO EL ARREGLO DE CLIENTES DEL LOCAL STORAGE
    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

    //BUSCO EL CLIENTE A ELIMINAR
    let index = this.clientes.findIndex(client => client.id == this.currentClient.id);

    //ELIMINO EL CLIENTE
    this.clientes[index].borrado = true;

    //GUARDO EL ARREGLO DE CLIENTES EN EL LOCAL STORAGE
    localStorage.setItem("clientes", JSON.stringify(this.clientes));

    //RECARGO LA LISTA DE CLIENTES
    this.listClients();

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
    let obj: Cliente = this.clientes.find(o => o.id === this.currentClient.id)!;
    obj.documento = this.currentClient.documento;
    obj.nombre = this.currentClient.nombre;
    obj.apellido = this.currentClient.apellido;
    obj.fecha_nac = this.currentClient.fecha_nac;
    obj.direccion = this.currentClient.direccion;
    obj.telefono = this.currentClient.telefono;
    localStorage.setItem("clientes", JSON.stringify(this.clientes));
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

  //LISTAR CLIENTES
  listClients(){
    // OBTENGO EL ARREGLO DE CLIENTES DEL LOCAL STORAGE
    this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    this.clientes = this.clientes.filter(client => client.borrado == false);
  }

  //ESCONDER FORMULARIO DE EDICION O BORRADO
  hideEditOrDelete(){
    document.getElementById("editOrDelete")!.style.display = "none"; 
  }
  

  constructor() { }

  ngOnInit(): void {
    this.listClients();
  }

}

