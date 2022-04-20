import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Route} from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { ClientCrudComponent } from './client-crud/client-crud.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductCrudComponent } from './product-crud/product-crud.component';
import { SaleCrudComponent } from './sale-crud/sale-crud.component';

const routes: Route[] = [
  {path: '', component: WelcomeComponent},
  {path: 'clients', component: ClientCrudComponent},
  {path: 'products', component: ProductCrudComponent},
  {path: 'sales', component: SaleCrudComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    CardComponent,
    ClientCrudComponent,
    WelcomeComponent,
    ProductCrudComponent,
    SaleCrudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
