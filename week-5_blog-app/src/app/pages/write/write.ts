import { Component } from '@angular/core';
import { Post } from '../../models/post-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './write.html',
  styleUrl: './write.css',
})
export class Write {
  post: Post = {
    id: 0,
    title: '',
    body: '',
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    userId: 0,
  };

  tagInput: string = '';

  submitPost() {
    this.post.views = 0;
    this.post.reactions = { likes: 0, dislikes: 0 };
    console.log('Post submitted:', this.post);
    alert('Post submitted successfully!');
    // Reset form
    this.post = {
      id: 0,
      title: '',
      body: '',
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 0,
    };
    this.tagInput = '';
  }

  addTag() {
    const tag = this.tagInput.trim();
    if (tag && !this.post.tags.includes(tag)) {
      this.post.tags.push(tag);
    }
    this.tagInput = '';
  }

  removeTag(tag: string) {
    this.post.tags = this.post.tags.filter((t) => t !== tag);
  }
}
