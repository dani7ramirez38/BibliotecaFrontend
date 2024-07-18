import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorService } from '../service/autor.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
 
  form: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private autorServicio: AutorService,
    private router: Router,
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      id: number,
      nombre: string,
      apellido: string,
      nacionalidad: string
    }
  ) {
    this.id = data.id;
    this.form = fb.group({
      id: [data.id, Validators.required], 
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      nacionalidad: [data.nacionalidad, Validators.required]
      
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    const autorData = this.form.value;

    const autor = {
      id: this.id,
      nombre: autorData.nombre,
      apellido: autorData.apellido,
      nacionalidad: autorData.nacionalidad
    };

    this.autorServicio.actuaizarAutor(this.id, autor).subscribe({
      next: (data: any) => {
        this.router.navigate(['/Autor']);
        window.location.reload();
      },
      error: (error: any) => {
        
        console.error('Error al actualizar el Autor:', error);
      }
    });
  }
  ngOnInit(): void {
   
  }
  
  
}
