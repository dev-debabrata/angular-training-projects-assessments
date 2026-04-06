import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

import { PostService } from '../../../services/post-service';
import { Post } from '../../../models/post-model';
import { Loader } from '../../../shared/loader/loader';
import { Error } from '../../../shared/error/error';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [SlicePipe, Loader, Error],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  @Input() limit?: number;

  private postService = inject(PostService);
  private router = inject(Router);

  private destroyRef = inject(DestroyRef);

  posts: Post[] = [];
  isLoading = signal(true);
  errorMsg = signal(false);

  ngOnInit(): void {
    const postSub = this.postService.getPosts().subscribe({
      next: (res: { posts: Post[] }) => {
        console.log('API Response:', res);

        this.posts = res.posts.sort((a: Post, b: Post) => b.id - a.id);

        if (this.limit) {
          this.posts = this.posts.slice(0, this.limit);
        }

        this.isLoading.set(false);
      },

      error: (err) => {
        console.error(err);
        this.errorMsg.set(true);
        this.isLoading.set(false);
      },
    });
    // const postSub = this.postService.getPosts().subscribe({
    //   next: (res: any) => {
    //     const postsArray: Post[] = Array.isArray(res) ? res : (res.posts ?? []);

    //     // Sort by latest ID
    //     const sorted = postsArray.sort((a, b) => b.id - a.id);

    //     // Apply limit
    //     this.posts = this.limit ? sorted.slice(0, this.limit) : sorted;
    //     this.isLoading = false;

    //     console.log(this.posts);
    //     // this.posts = res.posts;
    //     // console.log(res);
    //   },
    //   error: (err) => {
    //     this.errorMsg = true;
    //     this.isLoading = false;
    //     console.error('Something went to wrong!');
    //   },
    // });

    // Automatically Component Destroyed
    this.destroyRef.onDestroy(() => {
      postSub.unsubscribe();
    });
  }

  // Navigate to product details page
  viewPostDetails(id: number): void {
    this.router.navigate(['/posts', id]);
  }
}
