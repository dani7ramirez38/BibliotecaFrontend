import { Component } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditarComponent } from '../editar/editar.component';
import { Usuarios } from '../Interfaces/IDataUsuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  displayedColumns: string[] = ['id','nombre','correo','acciones'];
  constructor(private usuariosService: UsuariosService, 
                public dialog: MatDialog, 
                private router: Router){  }
  
  ngOnInit(): void{
  this.usuariosService.listarUsuarios();
    }
  get resultados(){
    return this.usuariosService.resultados
  }

  editarUsuarios(usuarios: UsuariosService){
    this.dialog.open(EditarComponent,{disableClose:true, width:'400px', data:usuarios})
      .afterClosed()
      .subscribe((resultado)=>{
        if(resultado=== 'true') 
          this.resultados;
        }) ;
      }

      removerUsuarios(usuarios: Usuarios) {
      
        Swal.fire({
          title: '¿Desea Eliminar El Usuario?',
          text: usuarios.nombre,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'No'
        }).then((resultado) => {
          if (resultado.isConfirmed) {
            if(usuarios.nombre!== undefined){
              this.usuariosService.eliminarUsuarios(usuarios.id).subscribe({
                next: (data) => {
                  console.log(data); // Verificar la estructura de la respuesta en la consola
                  if (data) {
                    Swal.fire({
                      icon: "success",
                      title: "El Usuario fue eliminado correctamente",
                      showConfirmButton: true,
                    });
                    this.usuariosService.listarUsuarios();
                    window.location.reload();
                   
                  } 
                  else {
                    
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "El Usuario no pudo ser eliminado",
                      showConfirmButton: true,
                    });
                  }
                },
                error: (e) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrió un error al intentar eliminar el Usuario",
                    showConfirmButton: true,
                  });
                  this.router.navigate(['/usuarios']);
                }
              });
              
              
            }
          }
        });
      }
  }
  
  
  