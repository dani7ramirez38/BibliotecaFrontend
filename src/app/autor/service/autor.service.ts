import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/categoria/Interfaces/IDataCategoria';
import { environment } from 'src/environments/environments.development';
import { Autor, IDataAutor } from '../Interfaces/IDataAutor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  apiUrl: string = environment.apiUrl;
  autorUrl: string = `${this.apiUrl}/Autor`;
  
  resultados: Autor[] = [];
  
  
  constructor(private http: HttpClient) { }

  listarAutor(){
    console.log ("Listar Autores")
    this.http.get<IDataAutor>(this.autorUrl)
              .subscribe(resp=> {
                this.resultados= resp.resultado;
              })
  }
  
  getAutor(id: number){
    console.log ("tomar por id/")
    return this.http.get<Autor>(this.autorUrl+'/'+id);
  }

  agregarAutor(autor: Autor){
    return  this.http.post<any>(this.autorUrl,autor);
  }

  eliminarAutor(id: number): Observable<any>{
    return this.http.delete<any>(`${this.autorUrl+"/"}${id}`);
  }
  
  actuaizarAutor(id: number, autor: Autor): Observable<any>{
    return this.http.put(this.autorUrl+"/"+id, autor);
  }
}
