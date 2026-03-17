import { Component } from '@angular/core';


interface Profile{
  name: string;
  role: string;
  bio: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  profile: Profile = {
    name: "Debabrata Das",
    role: "Frontend Developer",
    bio: "Aspiring Angular developer currently learning and exploring web development concepts and building small projects."
  };

  contactMe(){
    alert(`connection ${this.profile.name}...`);
  }
}
