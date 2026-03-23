import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskForm } from './components/task-form/task-form';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { UiService } from './services/ui.service';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidebarComponent, TaskForm, LucideAngularModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'doable-frontend';
    readonly Menu = Menu;

    isAuthRoute = signal(false);

    constructor(public uiService: UiService, public authService: AuthService, router: Router) {
        router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => {
            const url = (e as NavigationEnd).urlAfterRedirects;
            this.isAuthRoute.set(url.startsWith('/sign-in') || url.startsWith('/sign-up'));
        });
    }
}

