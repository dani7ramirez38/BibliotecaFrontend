import { Component } from '@angular/core';
import { PrestamosService } from '../service/prestamos.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditarComponent } from '../editar/editar.component';
import { Prestamos } from '../Interfaces/IDataPrestamos';
import Swal from 'sweetalert2';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

    displayedColumns: string[] = ['id','fechaPrestamo','fechaDevolucion','libroID','usuarioID','acciones'];
    constructor(private prestamosService: PrestamosService, 
                  public dialog: MatDialog, 
                  private router: Router){  }
    
    ngOnInit(): void{
    this.prestamosService.listarPrestamos();
      }
    get resultados(){
      return this.prestamosService.resultados
    }
  
    editarPrestamos(prestamos: PrestamosService){
      this.dialog.open(EditarComponent,{disableClose:true, width:'400px', data:prestamos})
        .afterClosed()
        .subscribe((resultado)=>{
          if(resultado=== 'true') 
            this.resultados;
          }) ;
        }
  
        removerPrestamos(prestamos: Prestamos) {
          const dialogRef = this.dialog.open(ConfirmDialogComponent);
        
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              if (prestamos.id !== undefined) {
                this.prestamosService.eliminarPrestamos(prestamos.id).subscribe({
                  next: (data) => {
                    console.log(data); // Verificar la estructura de la respuesta en la consola
                    if (data) {
                      this.prestamosService.listarPrestamos(); // Actualizar la lista de préstamos
                      this.router.navigate(['/prestamos']);
                    } else {
                      console.error("El préstamo no pudo ser eliminado");
                    }
                  },
                  error: (e) => {
                    console.error("Ocurrió un error al intentar eliminar el préstamo", e);
                    this.router.navigate(['/prestamos']);
                  }
                });
              }
            }
          });
        }
      }