import { Component, inject, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Loader } from '../../shared/loader/loader';
import { Error } from '../../shared/error/error';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { Highlight } from '../../directives/highlight';

@Component({
  selector: 'app-product-list',
  imports: [Loader, Error, FormsModule, CommonModule, TruncatePipe, Highlight],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private router = inject(Router);
  private productService = inject(ProductService);

  searchTerm = '';

  products = signal<Product[]>([]);
  isLoading = signal(true);
  errorMsg = signal(false);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading.set(false);
        this.products.set(res.products);
      },

      error: (err) => {
        this.errorMsg.set(true);
        this.isLoading.set(false);
        console.log(err);
      },
    });
  }

  get filteredProducts() {
    const search = this.searchTerm.toLowerCase();
    return this.products().filter((product) => product.title.toLowerCase().includes(search));
  }

  viewDetails(id: number): void {
    this.router.navigate(['/product', id]);
  }
}

// get filteredProducts(): Product[] {
//   const search = this.searchTerm.toLowerCase();
//   return this.products().filter((product) => product.title.toLowerCase().includes(search)) || [];
// }
