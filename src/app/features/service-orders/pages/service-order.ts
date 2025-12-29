import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-service-order',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './service-order.html',
  styleUrls: ['./service-order.css'],
})
export class ServiceOrder {}