export interface IDataPrestamos {
    isExitoso: boolean;
    resultado: Prestamos[];
    mensaje:   string;
}

export interface Prestamos {
    id:              number;
    fechaPrestamo:   Date;
    fechaDevolucion: Date | null; 
    libroID:         number;
    usuarioID:         number;
}

