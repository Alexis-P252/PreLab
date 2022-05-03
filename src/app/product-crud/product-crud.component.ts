import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  productos: Producto[] = [];
  currentProduct: Producto = {} as Producto;

  formulario = {
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: ""
  }



  onSaveProduct = () => {
    //OBTENER ID AUTOINCREMENTAL
    this.productos = JSON.parse(localStorage.getItem("productos") || "[]");
    let id = this.productos.length;

    //AGREGAR NUEVO ARREGLO DE PRODUCTOS
    let nuevoProducto = new Producto(this.formulario.nombre, this.formulario.descripcion, parseFloat(this.formulario.precio), this.formulario.imagen, id);
    console.log(nuevoProducto)
    this.productos.push(nuevoProducto)

    //GUARDAR EN LOCALSTORAGE
    localStorage.setItem("productos", JSON.stringify(this.productos));

    //LIMPIAR FORMULARIO
    this.formulario = {     
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: ""
    }

    //RECARGAR LISTA DE PRODUCTOS
    this.listProducts();

    //OBTENER DIV ALERTA DOM
    let alerta = document.getElementById("product-confirmation")!;
    alerta.innerHTML = "Producto registrado correctamente";
    alerta.style.display = "flex";

    //MOSTRAR ALERTA POR 5 SEGUNDOS
    setTimeout(() => {
      alerta.style.display = "none";
    }, 5000);
  }

  //ELIMINAR PRODUCTO
  deleteProduct(){
    // OBTENGO EL ARREGLO DE PRODUCTOS DEL LOCAL STORAGE
    this.productos = JSON.parse(localStorage.getItem("productos") || "[]");

    //BUSCO EL PRODUCTO A ELIMINAR
    let index = this.productos.findIndex(product => product.id == this.currentProduct.id);

    //ELIMINO EL PRODUCTO
    this.productos[index].borrado = true;

    //GUARDO EL ARREGLO DE PRODUCTOS EN EL LOCAL STORAGE
    localStorage.setItem("productos", JSON.stringify(this.productos));

    //RECARGO LA LISTA DE PRODUCTOS
    this.listProducts();

    //ESCONDO EL FORMULARIO DE EDICION O BORRADO
    this.hideEditOrDelete();

    //OBTENER DIV ALERTA DOM
    let alerta = document.getElementById("product-confirmation")!;
    alerta.innerHTML = "Producto eliminado correctamente";
    alerta.style.display = "flex";

    //MOSTRAR ALERTA POR 5 SEGUNDOS
    setTimeout(() => {
      alerta.style.display = "none";
    }, 5000);
  }

  //VALIDAR FORMULARIO DE REGISTRO
  validarFormulario(){
    if(this.formulario.nombre == "" || this.formulario.descripcion == "" || !parseFloat(this.formulario.precio) ){
      return false;
    }else{
      return true;
    }
  }

    //VALIDAR FORMULARIO DE EDICION
  validarFormularioEdit(){
    if(this.currentProduct.nombre == "" || this.currentProduct.descripcion == "" ||  this.currentProduct.precio == NaN ){
      return false;
    }else{
      return true;
    }
  }


  //EDITAR PRODUCTO
  onEditProduct = () => {
    let obj: Producto = this.productos.find(o => o.id === this.currentProduct.id)!;
    obj.nombre = this.currentProduct.nombre;
    obj.descripcion = this.currentProduct.descripcion;
    obj.precio = this.currentProduct.precio;
  
    localStorage.setItem("productos", JSON.stringify(this.productos));
    this.hideEditOrDelete();
    
    //OBTENER DIV ALERTA DOM
    let alerta = document.getElementById("product-confirmation")!;
    alerta.innerHTML = "Producto editado correctamente";
    alerta.style.display = "flex";

    //MOSTRAR ALERTA POR 5 SEGUNDOS
    setTimeout(() => {
      alerta.style.display = "none";
    }, 5000);
  }


  //SELECCIONAR PRODUCTO
  selectProduct(product: Producto){

    // HAGO UNA COPIA DEL PRODUCTO SELECCIONADO EN LA LISTA
    this.currentProduct = JSON.parse(JSON.stringify(product)) ;
    document.getElementById("editOrDelete")!.style.display = "flex"; 
    console.log(this.currentProduct);
    
  }

  //LISTAR PRODUCTOS
  listProducts(){
    // OBTENGO EL ARREGLO DE PRODUCTOS DEL LOCAL STORAGE
    this.productos = JSON.parse(localStorage.getItem("productos") || "[]");
    this.productos = this.productos.filter(product => product.borrado == false);
  }

  //ESCONDER FORMULARIO DE EDICION O BORRADO
  hideEditOrDelete(){
    document.getElementById("editOrDelete")!.style.display = "none"; 
  }
    

  constructor() { }

  ngOnInit(): void {
    this.listProducts();
  }

}
