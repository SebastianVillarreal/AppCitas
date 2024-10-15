import { NgModule } from '@angular/core';
import {CalendarModule, DateAdapter} from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarioComponent } from './calendario.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports : [
        CommonModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory, 
        }),
    ],
    declarations: [CalendarioComponent],
    exports: [CalendarioComponent],
})
export class CalendarioModule {}