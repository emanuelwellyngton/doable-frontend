import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sun, Moon, Monitor } from 'lucide-angular';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    readonly Sun = Sun;
    readonly Moon = Moon;
    readonly Monitor = Monitor;

    activeTab: 'account' | 'appearance' | 'notifications' = 'account';
    theme: 'light' | 'dark' | 'system' = 'dark';

    notifications = {
        dailyDigest: true,
        newAssignments: true
    };

    switchTheme(newTheme: 'light' | 'dark' | 'system') {
        this.theme = newTheme;
        // Implement actual theme switching logic here if needed (e.g. document class)
    }

    toggleNotification(type: 'dailyDigest' | 'newAssignments') {
        this.notifications[type] = !this.notifications[type];
    }
}
