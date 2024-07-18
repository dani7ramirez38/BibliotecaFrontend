import { Component } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {
  id: any;
  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
  console.log(":::::::::::::cargado eliminar:::::::::::::");
  this.id = this.route.snapshot.paramMap.get('id');
  this.usuariosService.getUsuarios(this.id).subscribe((data:any)=>{
    console.log(data);
    
  })
  
  
  }
    
  }
   
