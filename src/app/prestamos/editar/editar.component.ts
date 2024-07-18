import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestamosService } from '../service/prestamos.service';
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
    private prestamosServicio: PrestamosService,
    private router: Router,
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      id:              number;
      fechaPrestamo:   Date;
      fechaDevolucion: Date;
      libroID:         number;
      usuarioID:         number;
      
    }
  ) {
    this.id = data.id;
    this.form = fb.group({
      id: [data.id, Validators.required], 
      fechaPrestamo: [data.fechaPrestamo, Validators.required],
      fechaDevolucion: [data.fechaDevolucion, Validators.required],
      libroID: [data.libroID, Validators.required],
      usuarioID: [data.usuarioID, Validators.required],
      
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    const prestamosData = this.form.value;

    const prestamos = {
      id: this.id,
      fechaPrestamo: prestamosData.fechaPrestamo,
      fechaDevolucion: prestamosData.fechaDevolucion,
      libroID: prestamosData.libroID,
      usuarioID: prestamosData.usuarioID,
      
    };

    this.prestamosServicio.actuaizarPrestamos(this.id, prestamos).subscribe({
      next: (data: any) => {
        this.router.navigate(['/Prestamo']);
        window.location.reload();
      },
      error: (error: any) => {
        
        console.error('Error al actualizar el Prestamo:', error);
      }
    });
  }
  ngOnInit(): void {
   
  }
  
  
}
