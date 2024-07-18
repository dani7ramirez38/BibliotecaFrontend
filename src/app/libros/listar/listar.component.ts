import { Component } from '@angular/core';
import { LibrosService } from '../service/libros.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditarComponent } from '../editar/editar.component';
import { Libros } from '../Interfaces/IDataLibros';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
 

  displayedColumns: string[] = ['id','titulo','anioPublicacion','autorID','categoriaID','acciones'];
  constructor(private librosService: LibrosService, 
                public dialog: MatDialog, 
                private router: Router){  }
  
  ngOnInit(): void{
  this.librosService.listarLibros();
    }
  get resultados(){
    return this.librosService.resultados
  }

  editarLibros(libros: LibrosService){
    this.dialog.open(EditarComponent,{disableClose:true, width:'400px', data:libros})
      .afterClosed()
      .subscribe((resultado)=>{
        if(resultado=== 'true') 
          this.resultados;
        })   
      }

    removerLibros(libros: Libros) {
      
      Swal.fire({
        title: '¿Desea Eliminar El Libro?',
        text: libros.titulo,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          if(libros.titulo!== undefined){
            this.librosService.eliminarLibros(libros.id).subscribe({
              next: (data) => {
                console.log(data); // Verificar la estructura de la respuesta en la consola
                if (data) {
                  Swal.fire({
                    icon: "success",
                    title: "El libro fue eliminado correctamente",
                    showConfirmButton: true,
                  });
                  this.librosService.listarLibros();
                  window.location.reload();
                 
                } 
                else {
                  
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El Libro no pudo ser eliminado",
                    showConfirmButton: true,
                  });
                }
              },
              error: (e) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrió un error al intentar eliminar el Libro",
                  showConfirmButton: true,
                });
                this.router.navigate(['/libros']);
              }
            });
            
            
          }
        }
      });
    }
}


