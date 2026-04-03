import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Breadcrumb, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
