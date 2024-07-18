import { Component } from '@angular/core';
import { AutorService } from '../service/autor.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Autor } from '../Interfaces/IDataAutor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  constructor(private autorService: AutorService, private router: Router){}

  autorform = new FormGroup({
   
    
   
    nombre: new FormControl(null,Validators.required),
    apellido: new FormControl(null,Validators.required),
    nacionalidad: new FormControl(null,Validators.required),
    
  })
 
    onSubmit(){
      if (this.autorform.valid) {
        const autorData = this.autorform.value;
        console.log(autorData);

        
        // Usa el operador de fusión nula (??) para manejar null y undefined
        const nombre: string = autorData.nombre ?? ''; 
        const apellido:  string = autorData.apellido ?? ''; 
        const nacionalidad: string = autorData.nacionalidad ?? ''; 
       

        
        const autor: Autor = {
          id: 0,
          nombre: nombre,
          apellido: apellido,
          nacionalidad: nacionalidad,
          

        }
        this.autorService.agregarAutor(autor).subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: "success",
              title: "El autor fue Agregado correctamente",
              showConfirmButton: true
            });
            this.router.navigate(['/autor/listar']);
          },
          error: (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Hubo un error al agregar el nuevo Autor",
              showConfirmButton: true
            });
          }
        });
      }
    }
}



