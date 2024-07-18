import { Component } from '@angular/core';
import { PrestamosService } from '../service/prestamos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {
  id: any;
  constructor(private prestamosService: PrestamosService, private route: ActivatedRoute){}

ngOnInit(): void {
console.log(":::::::::::::cargado eliminar:::::::::::::");
this.id = this.route.snapshot.paramMap.get('id');
this.prestamosService.getPrestamos(this.id).subscribe((data:any)=>{
  console.log(data);
  
})
}
}