export interface IDataUsuarios {
    isExitoso: boolean;
    resultado: Usuarios[];
    mensaje:   string;
}

export interface Usuarios {
    id:     number;
    nombre: string;
    correo: string;
}
