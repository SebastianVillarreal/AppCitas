import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

//Impor fullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
// import de los plugin;
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

//Importar el idioma español
import esLocale from '@fullcalendar/core/locales/es';


//Eventos iniciales prueba
const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

const initialEvents: EventInput[] = [
  {
    id: '1',
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: '2',
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: '3',
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
]


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {
  calendarVisible = signal(true);
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
    initialEvents:initialEvents,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locales:[esLocale],
    locale: 'es'
  });

  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  // view: CalendarView = CalendarView.Month;
  // CalendarView = CalendarView;

  // viewDate: Date = new Date();
  // activeDayIsOpen: boolean = false; 
  // refresh = new Subject<void>();

  // Las acciones disponibles para cada evento o cita programada (editar y eliminar)
  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event)
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];


  //Aquí se van a pasar la lista de citas programadas
  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()),1),
  //     end: addDays(new Date(),1),
  //     title: 'A 3 day event',
  //     color: {...colors['blue']},
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: {...colors['blue']},
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'An long with no end date',
  //     color: {...colors['blue']},
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: { ...colors['blue'] },
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  // dayClicked({date, events}: {date: Date; events:CalendarEvent[]}): void {
  //   if(isSameMonth(date, this.viewDate)) {
  //     if((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0)
  //     {
  //       this.activeDayIsOpen = false;
  //     }
  //     else
  //     {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;
  //   }
  // }

  // //Cambiar el view
  // setView(view: CalendarView)
  // {
  //   this.view = view;
  // }

  // closeOpenMonthViewDay() 
  // {
  //   this.activeDayIsOpen = false;
  // }
}
