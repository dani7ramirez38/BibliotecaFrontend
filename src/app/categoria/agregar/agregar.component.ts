import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../Interfaces/IDataCategoria';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  constructor(private categoriaService: CategoriaService, private router: Router){}

  categoriaform = new FormGroup({

    nombre: new FormControl(null,Validators.required),
    
  })
 
    onSubmit(){
      if (this.categoriaform.valid) {
        const categoriaData = this.categoriaform.value;
        console.log(categoriaData);

        
        // Usa el operador de fusión nula (??) para manejar null y undefined
        const nombre: string = categoriaData.nombre ?? ''; 
       
        
        const categoria: Categoria = {
          id: 0,
          nombre: nombre,
        }
        this.categoriaService.agregarCategoria(categoria).subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: "success",
              title: "La Categoria fue agregada correctamente",
              showConfirmButton: true
            });
            this.router.navigate(['/categoria/listar']);
          },
          error: (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Hubo un error al agregar la Categoria",
              showConfirmButton: true
            });
          }
        });
      }
    }
}


