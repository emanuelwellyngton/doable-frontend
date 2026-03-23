import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { taskResolver } from './resolvers/task.resolver';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
    },
    {
        path: 'sign-in',
        loadComponent: () => import('./components/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
    },
    {
        path: 'tasks',
        component: TaskListComponent,
        canActivate: [authGuard],
        resolve: {
            tasks: taskResolver
        }
    },
    {
        path: 'settings',
        canActivate: [authGuard],
        loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
    }
];
