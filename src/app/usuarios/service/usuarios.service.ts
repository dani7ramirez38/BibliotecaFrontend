import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.development';
import { IDataUsuarios, Usuarios } from '../Interfaces/IDataUsuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiUrl: string = environment.apiUrl;
  usuariosUrl: string = `${this.apiUrl}/Usuario`;
  
  resultados: Usuarios[] = [];
  
  
  constructor(private http: HttpClient) { }

  listarUsuarios(){
    console.log ("listar Entrada")
    this.http.get<IDataUsuarios>(this.usuariosUrl)
              .subscribe(resp=> {
                this.resultados= resp.resultado;
              })
  }
  
  getUsuarios(id: number){
    console.log ("tomar por id/")
    return this.http.get<Usuarios>(this.usuariosUrl+'/'+id);
  }

  agregarUsuarios(usuarios: Usuarios){
    return  this.http.post<any>(this.usuariosUrl,usuarios);
  }

  eliminarUsuarios(id: number): Observable<any>{
    return this.http.delete<any>(`${this.usuariosUrl+"/"}${id}`);
  }
  
  actuaizarUsuarios(id: number, usuarios: Usuarios): Observable<any>{
    return this.http.put(this.usuariosUrl+"/"+id, usuarios);
  }
}
