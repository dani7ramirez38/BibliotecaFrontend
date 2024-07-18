import { Component } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditarComponent } from '../editar/editar.component';
import { Categoria } from '../Interfaces/IDataCategoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  displayedColumns: string[] = ['id','nombre','acciones'];
  constructor(private categoriaService: CategoriaService, 
                public dialog: MatDialog, 
                private router: Router){  }
  
  ngOnInit(): void{
  this.categoriaService.listarCategoria();
    }
  get resultados(){
    return this.categoriaService.resultados
  }

  editarCategoria(categoria: CategoriaService){
    this.dialog.open(EditarComponent,{disableClose:true, width:'400px', data:categoria})
      .afterClosed()
      .subscribe((resultado)=>{
        if(resultado=== 'true') 
          this.resultados;
        })   
      }

    removerCategoria(categoria: Categoria) {
      
      Swal.fire({
        title: '¿Desea Eliminar la Categoria?',
       text: categoria.nombre,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          if(categoria.id!== undefined){
            this.categoriaService.eliminarCategoria(categoria.id).subscribe({
              next: (data) => {
                console.log(data); // Verificar la estructura de la respuesta en la consola
                if (data) {
                  Swal.fire({
                    icon: "success",
                    title: "La Categoria fue eliminada correctamente",
                    showConfirmButton: true,
                  });
                  this.categoriaService.listarCategoria();
                  window.location.reload();
                 
                } 
                else {
                  
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La Categoria no pudo ser eliminada",
                    showConfirmButton: true,
                  });
                }
              },
              error: (e) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrió un error al intentar eliminar Categoria",
                  showConfirmButton: true,
                });
                this.router.navigate(['/categoria']);
              }
            });
            
            
          }
        }
      });
    }
}




