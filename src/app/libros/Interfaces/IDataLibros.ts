
export interface IDataLibros {
    isExitoso: boolean;
    resultado: Libros[];
    mensaje: string;
  }
  export interface Libros {
    id: number;
    titulo: string;
    anioPublicacion: number;
    autorID: number;
    categoriaID: number;
   
}

