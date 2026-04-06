import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../../../services/post-service';
import { Loader } from '../../../shared/loader/loader';
import { Error } from '../../../shared/error/error';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, Loader, Error],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private postService = inject(PostService);

  post: any = null;
  isLoading = signal(true);
  errorMsg = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/posts']);
      return;
    }

    this.postService.getPostById(id).subscribe({
      next: (res) => {
        this.post = res;
        this.isLoading.set(false);
        console.log(res);
      },
      error: (err) => {
        this.errorMsg.set(true);
        this.isLoading.set(false);
        this.router.navigate(['/posts']);
        console.log(err);
      },
    });
  }
}
