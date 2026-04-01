import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Loader } from '../../shared/loader/loader';
import { Error } from '../../shared/error/error';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { Rating } from '../../utils/rating.util';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [Loader, Error, CommonModule, TimeAgoPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product: Product | null = null;
  // isLoading = true;
  // errorMsg = false;

  isLoading = signal(true);
  errorMsg = signal(false);

  stars: string[] = [];

  showAllReviews = false;

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(productId).subscribe({
      next: (res) => {
        this.product = res;
        this.stars = Rating.getStars(this.product.rating);
        // this.isLoading = false;
        this.isLoading.set(false);
        console.log(res);
      },
      error: (err) => {
        // this.errorMsg = true;
        // this.isLoading = false;
        this.errorMsg.set(true);
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  toggleReviews(): void {
    this.showAllReviews = !this.showAllReviews;
  }

  displayedReviews() {
    if (!this.product || !this.product.reviews) return [];
    return this.showAllReviews ? this.product.reviews : [this.product.reviews[0]];
  }

  isPopupOpen = false;

  openReviewsPopup(): void {
    this.isPopupOpen = true;
  }

  closeReviewsPopup(): void {
    this.isPopupOpen = false;
  }
}
