import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Product }            from 'src/app/interfaces/products';
import { ProductsService }    from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public userId: string = '';
  public showLoading: boolean = true;
  constructor(
    private _productService: ProductsService,
    private _router: Router
  ) {
    const nav = this._router.getCurrentNavigation();
    if (nav && nav.extras.state) this.userId = nav.extras.state['id'];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProduct().subscribe((response) => {
      this.products = response;
      this.showLoading = false;
    });
  }

  goBack() {
    if (this.userId)
      this._router.navigate(['/products'], { state: { id: this.userId } });
    else this._router.navigate(['/']);
  }
}
