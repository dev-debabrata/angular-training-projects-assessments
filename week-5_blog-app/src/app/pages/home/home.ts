import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PostList } from '../posts/post-list/post-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, PostList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
