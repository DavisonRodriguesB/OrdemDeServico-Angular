import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-service-order',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './service-order.html',
  styleUrls: ['./service-order.css'],
})
export class ServiceOrderComponent {}