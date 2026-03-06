import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { taskResolver } from './resolvers/task.resolver';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
    },
    {
        path: 'tasks',
        component: TaskListComponent,
        resolve: {
            tasks: taskResolver
        }
    },
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
    }
];
