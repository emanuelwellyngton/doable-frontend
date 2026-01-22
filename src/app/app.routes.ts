import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { taskResolver } from './resolvers/task.resolver';

export const routes: Routes = [
    {
        path: '',
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
