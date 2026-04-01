import { Component, inject } from '@angular/core';
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

  isLoading = true;
  errorMsg = false;
  stars: string[] = [];
  product: Product | null = null;

  showAllReviews = false;

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(productId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.product = res;
        console.log(res);
        this.stars = Rating.getStars(this.product.rating);
      },
      error: (err) => {
        this.errorMsg = true;
        this.isLoading = false;
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
