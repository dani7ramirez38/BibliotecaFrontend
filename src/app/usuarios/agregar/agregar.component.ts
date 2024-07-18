import { Component } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../Interfaces/IDataUsuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  constructor(private usuariosService: UsuariosService, private router: Router){}

  usuariosform = new FormGroup({

    nombre: new FormControl(null,Validators.required),
    correo: new FormControl(null,Validators.required),
    
  })
 
    onSubmit(){
      if (this.usuariosform.valid) {
        const usuariosData = this.usuariosform.value;
        console.log(usuariosData);

        
        const nombre: string = usuariosData.nombre ??  '';
        const correo: string = usuariosData.correo ?? '';
          
        const usuarios: Usuarios = {
          id: 0,
          nombre: nombre,
          correo: correo,
         
          
        }
        this.usuariosService.agregarUsuarios(usuarios).subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: "success",
              title: "El Prestamo fue creado correctamente",
              showConfirmButton: true
            });
            this.router.navigate(['/usuarios/listar']);
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

