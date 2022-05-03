import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-crud',
  templateUrl: './sale-crud.component.html',
  styleUrls: ['./sale-crud.component.css']
})
export class SaleCrudComponent implements OnInit {

  productos:any;
  clients:any;

  constructor() { }

  ngOnInit(): void {
  }

}
