import { Component } from '@angular/core';
import { PrestamosService } from '../service/prestamos.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prestamos } from '../Interfaces/IDataPrestamos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  constructor(private prestamosService: PrestamosService, private router: Router){}

  prestamosform = new FormGroup({

    fechaPrestamo: new FormControl(null,Validators.required),
    fechaDevolucion: new FormControl(null),
    libroID: new FormControl(null,Validators.required),
    usuarioID: new FormControl(null,Validators.required),
   
    
  })
 
    onSubmit(){
      if (this.prestamosform.valid) {
        const prestamosData = this.prestamosform.value;
        console.log(prestamosData);

        
         // Usa el operador de fusión nula (??) para manejar null y undefined
        const fechaPrestamo: Date = prestamosData.fechaPrestamo ? new Date(prestamosData.fechaPrestamo) : new Date();
        const fechaDevolucion: Date | null = prestamosData.fechaDevolucion ? new Date(prestamosData.fechaDevolucion) : null;
        const libroID: number = prestamosData.libroID ?? 0;
        const usuarioID: number = prestamosData.usuarioID ?? 0;
          
        const prestamos: Prestamos = {
          id: 0,
          fechaPrestamo: fechaPrestamo,
          fechaDevolucion: fechaDevolucion,
          libroID: libroID,
          usuarioID: usuarioID,
          
        }
        this.prestamosService.agregarPrestamos(prestamos).subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: "success",
              title: "El Prestamo fue creado correctamente",
              showConfirmButton: true
            });
            this.router.navigate(['/prestamos/listar']);
          },
          error: (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Hubo un error al crear el Prestamo",
              showConfirmButton: true
            });
          }
        });
      }
    }
}

