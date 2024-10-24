import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CitasService } from '@Services';

import { CitaInsertRequest } from '@Models/Cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  constructor() { }
  private fb = inject(FormBuilder)
  private citasService = inject(CitasService)

  form = this.fb.nonNullable.group({
    cliente: [0, [Validators.required, Validators.min(1)]],
    fecha: ['', [Validators.required]],
    horaInicio: ['', [Validators.required]], 
    horaFin: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  })

  onSubmit(): void
  {
    if (this.form.valid)
    {
      const { cliente, fecha, horaInicio, horaFin, descripcion } = this.form.getRawValue();
      
      const request: CitaInsertRequest = {
        IdCliente: cliente,
        Fecha: fecha,
        HoraInicio: horaInicio,
        HoraFin: horaFin,
        Descripcion: descripcion
      }

      const serviceCall = this.citasService.InsertCita(request);
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
    else
    {
      this.form.markAllAsTouched();  
    }
  }

  resetForm(): void{
    this.form.reset({
      cliente: 0,
      fecha: '',
      horaInicio: '',
      horaFin: '',
      descripcion: ''
    })
  }


}
