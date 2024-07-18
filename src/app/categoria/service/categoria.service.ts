import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.development';
import { Categoria, IDataCategoria } from '../Interfaces/IDataCategoria';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  apiUrl: string = environment.apiUrl;
  categoriaUrl: string = `${this.apiUrl}/Categoria`;
  
  resultados: Categoria[] = [];
  
  
  constructor(private http: HttpClient) { }

  listarCategoria(){
    console.log ("listar Entrada")
    this.http.get<IDataCategoria>(this.categoriaUrl)
              .subscribe(resp=> {
                this.resultados= resp.resultado;
              })
  }
  
  getCategoria(id: number){
    console.log ("tomar por id/")
    return this.http.get<Categoria>(this.categoriaUrl+'/'+id);
  }

  agregarCategoria(categoria: Categoria){
    return  this.http.post<any>(this.categoriaUrl,categoria);
  }

  eliminarCategoria(id: number): Observable<any>{
    return this.http.delete<any>(`${this.categoriaUrl+"/"}${id}`);
  }
  
  actuaizarCategoria(id: number, categoria: Categoria): Observable<any>{
    return this.http.put(this.categoriaUrl+"/"+id, categoria);
  }
}
