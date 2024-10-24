import { ApiResponse } from "@Models/Response";

export interface CitaInsertRequest
{
    IdCliente: number;
    Fecha: string;
    HoraInicio: string;
    HoraFin: string;
    Descripcion: string;
}    