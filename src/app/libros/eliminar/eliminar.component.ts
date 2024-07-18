import { Component } from '@angular/core';
import { LibrosService } from '../service/libros.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {
  id: any;
constructor(private librosService: LibrosService, private route: ActivatedRoute){}

ngOnInit(): void {
console.log(":::::::::::::cargado eliminar:::::::::::::");
this.id = this.route.snapshot.paramMap.get('id');
this.librosService.getLibros(this.id).subscribe((data:any)=>{
  console.log(data);
  
})


}
  
}
 



