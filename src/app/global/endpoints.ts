import { environment } from '@Environment';

export const auth = {
  login: `${environment.urlBase}SignIn`,
};
export const citas = {
  fechasOcupadas: `${environment.urlBase}ObtenerFechasConCitasOcupadas`,
  horariosOcupadosPorFecha: `${environment.urlBase}ObtenerHorariosOcupadosPorFecha`,
  reservarCita: `${environment.urlBase}ReservarCita`,
  eliminarCita: `${environment.urlBase}EliminarCita`
}