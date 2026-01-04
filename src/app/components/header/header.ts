import { Component } from '@angular/core';
import { LucideAngularModule, LayoutList } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  readonly LayoutList = LayoutList;
}
