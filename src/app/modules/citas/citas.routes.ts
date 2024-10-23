import { Routes } from '@angular/router';
import { LayoutComponent } from '@Component/Layout';
import { nameApp } from '@Constants';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo:'citas',
                pathMatch:'full'
            },
            {
                path: '',
                loadChildren: () => import('./pages/citas/citas.routes').then(m => m.routes),
                title: nameApp + 'Citas'
            },
            {
                path: 'calendario',
                loadChildren: () => import('./pages/calendario/calendario.routes').then(m => m.routes),
                title: nameApp + 'Calendario de citas'
            }

           
        ]
    },
];