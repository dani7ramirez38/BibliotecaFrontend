import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { BuscarComponent } from './buscar/buscar.component';



@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent,
    EditarComponent,
    EliminarComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LibrosModule { }
