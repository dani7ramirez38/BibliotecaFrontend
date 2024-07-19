import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';

import { HomeComponent } from './home/home.component';
import { LibrosRoutingModule } from './libros-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent,
    EditarComponent,
    EliminarComponent,

    HomeComponent
  ],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  
  ]
})
export class LibrosModule { }
