import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ToastModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [],
})
export class NavbarComponent {
  constructor(private messageService: MessageService) {}
}
