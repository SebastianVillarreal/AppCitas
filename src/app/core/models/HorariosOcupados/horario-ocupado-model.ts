import { ApiResponse } from "@Models/Response";

export type HorarioOcupadoResponse = ApiResponse<HorarioOcupadoModel[]>;

export interface HorarioOcupadoModel {
    IdCita: number;
    HoraInicio: string;
    HoraFin: string;
    Descripcion: string;
}
