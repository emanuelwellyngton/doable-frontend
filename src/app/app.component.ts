import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskForm } from './components/task-form/task-form';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { UiService } from './services/ui.service';

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

    constructor(public uiService: UiService) { }
}
