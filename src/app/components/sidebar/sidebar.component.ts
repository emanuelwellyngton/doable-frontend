import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, CheckSquare, ListTodo, Settings, Plus, User } from 'lucide-angular';
import { UiService } from '../../services/ui.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    readonly CheckSquare = CheckSquare;
    readonly ListTodo = ListTodo;
    readonly Settings = Settings;
    readonly Plus = Plus;
    readonly User = User;

    constructor(private router: Router, public uiService: UiService) { }

    createNewTask() {
        this.uiService.openCreateTaskModal();
    }
}
