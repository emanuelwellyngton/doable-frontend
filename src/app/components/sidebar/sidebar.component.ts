import { Component } from '@angular/core';
import { CommonModule, SlicePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, CheckSquare, ListTodo, Settings, Plus, LogOut } from 'lucide-angular';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule, SlicePipe, UpperCasePipe],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    readonly CheckSquare = CheckSquare;
    readonly ListTodo = ListTodo;
    readonly Settings = Settings;
    readonly Plus = Plus;
    readonly LogOut = LogOut;

    constructor(private router: Router, public uiService: UiService, public authService: AuthService) { }

    createNewTask() {
        this.uiService.openCreateTaskModal();
    }

    logout() {
        this.authService.logout();
    }
}

