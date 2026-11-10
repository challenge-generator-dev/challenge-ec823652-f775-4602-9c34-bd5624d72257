import { ProductEntity } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
  update(id: string, product: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<ProductEntity | null>;
}