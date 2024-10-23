import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./citas.component').then(m => m.CitasComponent)
    }
];