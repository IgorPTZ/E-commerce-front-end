import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  previousCategoryId: any = 1;

  currentCategoryId: any = 1;

  products: Product[] = [];

  searchMode: boolean = false;

  // New properties for pagination

  thePageNumber: number = 1;

  thePageSize: number = 10;

  theTotalElements: number = 0;
  

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });   
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {

    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');

    // Now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      (data: Product[]) => {
        this.products = data;
        console.info(this.products.length);
      }
    )
  }

  handleListProducts() {

     // Check if "id" parameter is available
     const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

     if(hasCategoryId) {
 
       // Get the "id" param string. Convert string to a number using the "+" symbol
       this.currentCategoryId = this.route.snapshot.paramMap.get('id');
     }
     else {
        
       // Not category id available ... default to category id 1
       this.currentCategoryId = 1;
     }

     /*
      Check if we have a different category than previous
      
      Note: Angular will reuse a component if it is currently being viewed

      If we have a different category id than previous then set thePageNumber back to 1
     */
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

     // Now get the products for the given category id
     this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(this.processResult());                                           
  }

  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
}
