import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  // loading = true;
  // ngOnInit() {
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 5000); // simulate API delay
  // }
}
