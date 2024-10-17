import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { citas } from '@EndPoints';
import { HorarioOcupadoResponse } from '@Models/HorarioOcupado';
import { FechaOcupadaResponse } from '@Models/FechaOcupada';
@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  GetFechasOcupadas(): Observable<FechaOcupadaResponse> {
    const httpOptions = {headers: this.headers}
    return this.http.get<FechaOcupadaResponse>(citas.fechasOcupadas, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  GetHorariosOcuapdosPorFecha(fecha: string): Observable<HorarioOcupadoResponse> {
    const httpOptions = {headers: this.headers};
    const url = `${citas.horariosOcupadosPorFecha}?Fecha=${fecha}`;
    return this.http.get<HorarioOcupadoResponse>(url, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
