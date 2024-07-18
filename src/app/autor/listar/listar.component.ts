import { Component } from '@angular/core';
import { AutorService } from '../service/autor.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarComponent } from '../editar/editar.component';
import { Autor } from '../Interfaces/IDataAutor';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  displayedColumns: string[] = ['id','nombre','apellido', 'nacionalidad','acciones'];
  constructor(private autorService: AutorService, 
                public dialog: MatDialog, 
                private router: Router){  }
  
  ngOnInit(): void{
  this.autorService.listarAutor();
    }
  get resultados(){
    return this.autorService.resultados
  }

  editarAutor(autor: AutorService){
    this.dialog.open(EditarComponent,{disableClose:true, width:'400px', data:autor})
      .afterClosed()
      .subscribe((resultado)=>{
        if(resultado=== 'true') 
          this.resultados;
        })   
      }

    removerAutor(autor: Autor) {
      
      Swal.fire({
        title: '¿Desea Eliminar el Autor?',
       text: autor.nombre,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          if(autor.id!== undefined){
            this.autorService.eliminarAutor(autor.id).subscribe({
              next: (data) => {
                console.log(data); // Verificar la estructura de la respuesta en la consola
                if (data) {
                  Swal.fire({
                    icon: "success",
                    title: "El Autor fue eliminado correctamente",
                    showConfirmButton: true,
                  });
                  this.autorService.listarAutor();
                  window.location.reload();
                 
                } 
                else {
                  
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El Autor no pudo ser eliminado",
                    showConfirmButton: true,
                  });
                }
              },
              error: (e) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrió un error al intentar eliminar el Autor",
                  showConfirmButton: true,
                });
                this.router.navigate(['/autor']);
              }
            });
            
            
          }
        }
      });
    }
}




