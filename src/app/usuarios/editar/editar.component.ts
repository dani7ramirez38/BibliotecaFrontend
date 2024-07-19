import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../service/usuarios.service';
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
    private usuariosServicio: UsuariosService,
    private router: Router,
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      id: number,
      nombre: string,
      correo: string,
      
    }
  ) {
    this.id = data.id;
    this.form = fb.group({
      id: [data.id, Validators.required], 
      nombre: [data.nombre, Validators.required],
      correo: [data.correo, Validators.required],
      
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    const usuariosData = this.form.value;

    const usuarios = {
      id: this.id,
      nombre: usuariosData.nombre,
      correo: usuariosData.correo,
      
    };

    this.usuariosServicio.actuaizarUsuarios(this.id, usuarios).subscribe({
      next: (data: any) => {
        this.router.navigate(['/usuarios']);
        window.location.reload();
      },
      error: (error: any) => {
        
        console.error('Error al actualizar el Usuario:', error);
      }
    });
  }
  ngOnInit(): void {
   
  }
  
  
}


