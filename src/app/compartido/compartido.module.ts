import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { BuscarComponent } from '../libros/buscar/buscar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    
    
  ],
  imports: [
    CommonModule,
     MaterialModule,
    AppRoutingModule
  ], 
  exports:[
    HeaderComponent,
    HomeComponent,
    
  ]
})
export class CompartidoModule { }
