import { Component , signal, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventApi, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import { CitasService } from '@Services';
import { HorarioOcupadoModel } from '@Models/HorarioOcupado';

import { forkJoin } from 'rxjs';


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
    locale: 'es'
  });

  getFechasOcupadas()
  {
    this.citaService.GetFechasOcupadas().subscribe((data) => {
      this.fechasOcupadasList = data.response.map(fechaCompleta => fechaCompleta.split(' ')[0]);
  
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
      title: horario.Descripcion,
      start: new Date(fecha + ' ' + horario.HoraInicio),
      end: new Date(fecha + ' ' + horario.HoraFin),
    };
    this.eventosList.push(evento);
    console.log(this.eventosList);
  }

  updateCalendarEvents() {
    this.calendarOptions.set({
      events: this.eventosList
    })
  }
}
