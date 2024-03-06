import { HttpClient }   from '@angular/common/http';
import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import { environment }  from 'src/environments/environment';
import { Product }      from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return new Observable<Product[]>(observer => {
        this.http
          .get<Product[]>(
            `${environment.apiProductsUrl}v1/products-highlights`
          )
          .subscribe(
            (products) => {
              observer.next(products);
              observer.complete();
            },
            () => {
              observer.error('error_on_get_products');
              observer.complete();
            }
          );
    });
  }
}
