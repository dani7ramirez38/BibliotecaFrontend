export interface IDataAutor {
    isExitoso: boolean;
    resultado: Autor[];
    mensaje:   string;
}

export interface Autor {
    id:           number;
    nombre:       string;
    apellido:     string;
    nacionalidad: string;
}
