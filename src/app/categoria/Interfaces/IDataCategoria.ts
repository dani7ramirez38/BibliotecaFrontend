export interface IDataCategoria {
    isExitoso: boolean;
    resultado: Categoria[];
    mensaje:   string;
}

export interface Categoria {
    id:     number;
    nombre: string;
}
