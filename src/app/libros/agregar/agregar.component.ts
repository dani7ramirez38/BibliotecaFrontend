import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../service/libros.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Libros } from '../Interfaces/IDataLibros';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent  {
  constructor(private librosService: LibrosService, private router: Router){}

  librosform = new FormGroup({

    titulo: new FormControl(null,Validators.required),
    anioPublicacion: new FormControl(null,Validators.required),
    autorID: new FormControl(null,Validators.required),
    categoriaID: new FormControl(null,Validators.required),
    
  })
 
    onSubmit(){
      if (this.librosform.valid) {
        const librosData = this.librosform.value;
        console.log(librosData);

        
        // Usa el operador de fusión nula (??) para manejar null y undefined
        const titulo: string = librosData.titulo ?? ''; 
        const anioPublicacion: number = librosData.anioPublicacion ?? 0; 
        const autorID: number = librosData.autorID ?? 0; 
        const categoriaID: number = librosData.categoriaID ?? 0; 
       
        
        const libros: Libros = {
          id: 0,
          titulo: titulo,
          anioPublicacion: anioPublicacion,
          autorID: autorID,
          categoriaID: categoriaID,
        }
        this.librosService.agregarLibros(libros).subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: "success",
              title: "El libro fue agregada correctamente",
              showConfirmButton: true
            });
            this.router.navigate(['/libros/listar']);
          },
          error: (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Hubo un error al agregar el libro",
              showConfirmButton: true
            });
          }
        });
      }
    }
}


