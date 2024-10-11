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
                redirectTo:'personas',
                pathMatch:'full'
            },
           
        ]
    },
];