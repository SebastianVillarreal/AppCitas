import { ApiResponse } from "@Models/Response";

export type HorarioOcupadoResponse = ApiResponse<HorarioOcupadoModel[]>;

export interface HorarioOcupadoModel {
    HoraInicio: string;
    HoraFin: string;
    Descripcion: string;
}
