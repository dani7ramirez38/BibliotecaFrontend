import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../service/categoria.service';
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
    private categoriaServicio: CategoriaService,
    private router: Router,
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      id:number,
      nombre:string
    }
  ) {
    this.id = data.id;
    this.form = fb.group({
      id: [data.id, Validators.required], 
      nombre: [data.nombre, Validators.required]
      
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    const categoriaData = this.form.value;

    const categoria = {
      id: this.id,
      nombre: categoriaData.nombre
     
      
    };

    this.categoriaServicio.actuaizarCategoria(this.id, categoria).subscribe({
      next: (data: any) => {
        this.router.navigate(['/Categoria']);
        window.location.reload();
      },
      error: (error: any) => {
        
        console.error('Error al actualizar la Categoria:', error);
      }
    });
  }
  ngOnInit(): void {
   
  }
  
  
}

