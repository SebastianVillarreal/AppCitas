import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./calendario.component').then(m => m.CalendarioComponent)
    }
];