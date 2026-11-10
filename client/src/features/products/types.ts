export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}