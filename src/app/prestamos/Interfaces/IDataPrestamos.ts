export interface IDataPrestamos {
    isExitoso: boolean;
    resultado: Prestamos[];
    mensaje:   string;
}

export interface Prestamos {
    id:              number;
    fechaPrestamo:   Date;
    fechaDevolucion: Date;
    libroID:         number;
    usuarioID:         number;
}

