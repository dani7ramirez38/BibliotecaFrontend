import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EliminarComponent } from './eliminar/eliminar.component';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { AgregarComponent } from './agregar/agregar.component';
import { HomeComponent } from './home/home.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    EliminarComponent,
    EditarComponent,
    ListarComponent,
    AgregarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class UsuariosModule { }
