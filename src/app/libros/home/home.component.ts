import { Component } from '@angular/core';
import { Libros } from '../Interfaces/IDataLibros';
import { LibrosService } from '../service/libros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchId: number = 0;
  libro: Libros | null = null;

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
  }

  buscarLibroPorId(): void {
    if (this.searchId) {
      this.librosService.getLibros(this.searchId).subscribe((data: Libros) => {
        this.libro = data;
      }, error => {
        console.error('Error al buscar el libro', error);
        this.libro = null;
      });
    }
  }
}

