import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.development';
import { IDataLibros, Libros } from '../Interfaces/IDataLibros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  apiUrl: string = environment.apiUrl;
  librosUrl: string = `${this.apiUrl}/Libro`;
  
  
  
  resultados: Libros[] = [];
  
  
  constructor(private http: HttpClient) { }

  listarLibros(){
    console.log ("listar Libros")
    this.http.get<IDataLibros>(this.librosUrl)
              .subscribe(resp=> {
                this.resultados= resp.resultado;
              })
  }
  
  
  getLibros(id: number){
    console.log ("tomar por id/")
    return this.http.get<Libros>(this.librosUrl+'/'+id);
  }

  agregarLibros(libros: Libros){
    return  this.http.post<any>(this.librosUrl,libros);
  }

 
  eliminarLibros(id: number): Observable<any>{
    return this.http.delete<any>(`${this.librosUrl+"/"}${id}`);
  }
  
  actuaizarLibros(id: number, libros: Libros): Observable<any>{
    return this.http.put(this.librosUrl+"/"+id, libros);
  }

  buscarLibroPorId(id: string): Observable<any> {
    return this.http.get(`${this.librosUrl}/libros/${id}`);
  }
}
