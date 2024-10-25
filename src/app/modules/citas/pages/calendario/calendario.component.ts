import { Component , signal, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SweetAlertService } from '@Service/SweetAlert';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventApi, EventInput, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import { CitasService } from '@Services';
import { HorarioOcupadoModel } from '@Models/HorarioOcupado';

import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { error } from 'console';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {
  eventosList: EventInput[] = [];
  calendarVisible = signal(true);
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }
  private citaService = inject(CitasService);
  private sweetAlertServce = inject(SweetAlertService);

  fechasOcupadasList: string[] = [];
  horariosOcupadosList: HorarioOcupadoModel[] = [];


  ngOnInit()
  {
    this.getFechasOcupadas();
  }

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      dayGridPlugin,
      listPlugin,
      timeGridPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locales:[esLocale],
    locale: 'es',
    eventClick: this.handleEventClick.bind(this)
  });

  public getFechasOcupadas()
  {
    this.citaService.GetFechasOcupadas().subscribe((data) => {
      this.fechasOcupadasList = data.response;

      const requests = this.fechasOcupadasList.map(fecha => this.citaService.GetHorariosOcuapdosPorFecha(fecha));

      forkJoin(requests).subscribe((responses) => {
        this.horariosOcupadosList = [];
        this.eventosList = [];

        responses.forEach((response, index) => {
          const fecha = this.fechasOcupadasList[index];
          response.response.forEach((horario: HorarioOcupadoModel) => {
            this.getCalendarEvents(fecha, horario);
          });
        });

        this.updateCalendarEvents();
      });
    });
  }

  getHorariosOcupadosPorFecha(Fecha: string)
  {
    this.citaService.GetHorariosOcuapdosPorFecha(Fecha).subscribe((data) => {
      this.horariosOcupadosList =[...this.horariosOcupadosList, ...data.response];

      this.horariosOcupadosList.forEach((horario) => {
        this.getCalendarEvents(Fecha, horario)
      })

      this.updateCalendarEvents();

    })

  }

  getCalendarEvents(fecha:string, horario: HorarioOcupadoModel)
  {
    const evento: EventInput = {
      id: horario.IdCita.toString(),
      title: horario.Descripcion,
      start: new Date(fecha + ' ' + horario.HoraInicio),
      end: new Date(fecha + ' ' + horario.HoraFin),
    };
    this.eventosList.push(evento);

  }

  updateCalendarEvents() {
    this.calendarOptions.set({
      events: this.eventosList
    })
  }

  handleEventClick(clickInfo: EventClickArg) {
    const idCita = clickInfo.event.id
    const descripcion = clickInfo.event.title
    const fecha = clickInfo.event.start?.toLocaleDateString('es-Es')
    const horaInicio = clickInfo.event.start?.toLocaleTimeString('es-Es')
    const horaFin = clickInfo.event.end?.toLocaleTimeString('es-Es')

    const evento = clickInfo.el as HTMLElement;
    const limites = evento.getBoundingClientRect();

    this.sweetAlertServce.fire({
      title: 'Cita ' + idCita,
      html: `
        <div class="text-left">
          <p>${descripcion}</p>
          <p><strong>Fecha</strong>: ${fecha}</p>
          <p><strong>Hora Inicio</strong>: ${horaInicio}</p>
          <p><strong>Hora Fin</strong>: ${horaFin}</p>
        </div>
        

      `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Eliminar',
      confirmButtonText: 'Editar',
      position:'top-start',
      didOpen: () => {
        const swalPopup = Swal.getPopup();
        if (swalPopup)
        {
          swalPopup.style.position = 'absolute'
          const margen = 10
          const popupWidth = swalPopup.offsetWidth;
          const popupHeight = swalPopup.offsetHeight;

          const fueraDePantallaInferior = (limites.bottom + popupHeight > window.innerHeight)
          const fueraDePantallaIzquierda = (limites.left - popupWidth < 0);
          const fueraDePantallaDerecha = (limites.right + popupWidth > window.innerWidth)

          if (fueraDePantallaInferior)
          {
            swalPopup.style.top =  `${limites.top - popupHeight - margen}px`
          }
          else
          {
            swalPopup.style.top = `${limites.top}px`
          }

          if (fueraDePantallaIzquierda)
          {
            if (fueraDePantallaDerecha)
            {
              swalPopup.style.left = `${limites.left}px`
              if (fueraDePantallaInferior)
              {
                swalPopup.style.top = `${limites.top - popupHeight - margen}px`
              }
              else
              {
                swalPopup.style.top = `${limites.bottom + margen}px`;
              }
            }
            else
            {
              swalPopup.style.left = `${limites.right + margen}px`
            }
          }
          else
          {
            swalPopup.style.left = `${limites.left - swalPopup.offsetWidth - margen}px`
          }



        }
      }

    }).then((result) => {
      if (result.dismiss == Swal.DismissReason.cancel) {
        this.deleteCita(parseInt(idCita));
      }
    });
  }

  deleteCita(IdCita: number)
  {
    this.sweetAlertServce.confirm({
      title: '¿Estás seguro de eliminar la cita?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.DeleteCita(IdCita)
          .subscribe({
            next: (res) => {
              this.getFechasOcupadas()
            },
            error: (err) => {
              console.log(err)
            }
        })
      }
    })
  }
}
