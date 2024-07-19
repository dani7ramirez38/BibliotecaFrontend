import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.development';
import { IDataPrestamos, Prestamos } from '../Interfaces/IDataPrestamos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  apiUrl: string = environment.apiUrl;
  prestamosUrl: string = `${this.apiUrl}/Prestamo`;
  
  resultados: Prestamos[] = [];
  
  
  constructor(private http: HttpClient) { }

  listarPrestamos(){
    console.log ("Listar Prestamo")
    this.http.get<IDataPrestamos>(this.prestamosUrl)
              .subscribe(resp=> {
                this.resultados= resp.resultado;
              })
  }
  
  getPrestamos(id: number){
    console.log ("tomar por id/")
    return this.http.get<Prestamos>(this.prestamosUrl+'/'+id);
  }

  agregarPrestamos(prestamos: Prestamos){
    return  this.http.post<any>(this.prestamosUrl,prestamos);
  }

  eliminarPrestamos(id: number): Observable<any>{
    return this.http.delete<any>(`${this.prestamosUrl+"/"}${id}`);
  }
  
  actuaizarPrestamos(id: number, prestamos: Prestamos): Observable<any>{
    return this.http.put(this.prestamosUrl+"/"+id, prestamos);
  }
}
