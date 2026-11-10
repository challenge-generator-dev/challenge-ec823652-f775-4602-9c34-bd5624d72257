import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductSqlRepository.name);
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  private mapToEntity(product: Record<string, unknown>): ProductEntity {
    return {
      id: String(product.id),
      name: String(product.name),
      price: Number(product.price),
      stock: Number(product.stock),
      category: String(product.category),
      createdAt: new Date(product.createdAt as string),
      updatedAt: new Date(product.updatedAt as string),
    };
  }

  async create(data: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity> {
    this.logger.log(`Creating product with name: ${data.name}`);
    
    const product = await this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        category: data.category,
      },
    });

    return this.mapToEntity(product);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by id: ${id}`);
    
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      this.logger.warn(`Product not found: ${id}`);
      return null;
    }

    return this.mapToEntity(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.log('Finding all products');
    
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => this.mapToEntity(product));
  }

  async update(
    id: string,
    data: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating product with id: ${id}`);
    
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.category && { category: data.category }),
      },
    });

    return this.mapToEntity(product);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product with id: ${id}`);
    
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by name: ${name}`);
    
    const product = await this.prisma.product.findUnique({
      where: { name },
    });

    if (!product) {
      return null;
    }

    return this.mapToEntity(product);
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}