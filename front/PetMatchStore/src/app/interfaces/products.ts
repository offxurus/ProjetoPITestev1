export interface Product {
  id: string;
  name: string;
  description: string;
  value: number;
  promotional_value: number;
  featured_image: string;
  images: [string];
  videos: [string];
  rating_stars: number;
  rating_count: number;
  installment_available: true;
  installment_count: number;
  featured: true;
  category: string;
  subcategory: string;
  animal_type: AnimalType;
  status: string;
  url: string;
  created_at: string;
}

export interface ProductsGetResponse {
  cursor: string;
  products: Array<Product>;
}

export enum AnimalType {
  Cat = 'gato',
  Dog = 'cachorro',
  Others = 'outros',
}
