import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from '../service/libros.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  form: FormGroup;
  id: number;


  constructor(
    private fb: FormBuilder,
    private librosServicio: LibrosService,
    private router: Router,
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      id: number,
      titulo: string,
      anioPublicacion: number,
      autorID: number,
      categoriaID: number,
    }
  ) {
    this.id = data.id;
    this.form = fb.group({
      id: [data.id, Validators.required], 
      titulo: [data.titulo, Validators.required],
      anioPublicacion: [data.anioPublicacion, Validators.required],
      autorID: [data.autorID, Validators.required],
      categoriaID: [data.categoriaID, Validators.required],
     
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    const librosData = this.form.value;

    const libros = {
      id: this.id,
      titulo: librosData.titulo,
      anioPublicacion: librosData.anioPublicacion,
      autorID: librosData.autorID,
      categoriaID: librosData.categoriaID,
    };

    this.librosServicio.actuaizarLibros(this.id, libros).subscribe({
      next: (data: any) => {
        this.router.navigate(['/Libro']);
        window.location.reload();
      },
      error: (error: any) => {
        
        console.error('Error al actualizar el Libro:', error);
      }
    });
  }
  ngOnInit(): void {
   
  }
  
  
}

