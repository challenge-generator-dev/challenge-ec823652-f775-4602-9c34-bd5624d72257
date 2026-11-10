import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Document, Types } from 'mongoose';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';

interface ProductDocument extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductNosqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductNosqlRepository.name);
  private readonly productModel: Model<ProductDocument>;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.productModel = this.connection.model<ProductDocument>('Product');
  }

  private mapToEntity(doc: ProductDocument & { _id: Types.ObjectId }): ProductEntity {
    return {
      id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      stock: doc.stock,
      category: doc.category,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async create(data: Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductEntity> {
    this.logger.log(`Creating product with name: ${data.name}`);
    
    const createdProduct = new this.productModel({
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: data.category,
    });

    const savedProduct = await createdProduct.save();
    return this.mapToEntity(savedProduct as ProductDocument & { _id: Types.ObjectId });
  }

  async findById(id: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by id: ${id}`);
    
    try {
      const product = await this.productModel.findById(id).exec();
      
      if (!product) {
        this.logger.warn(`Product not found: ${id}`);
        return null;
      }

      return this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId });
    } catch (error) {
      this.logger.error(`Error finding product by id: ${id}`, error);
      return null;
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.log('Finding all products');
    
    const products = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    return products.map((product) => 
      this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId })
    );
  }

  async update(
    id: string,
    data: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating product with id: ${id}`);
    
    const updateData: Record<string, unknown> = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.stock !== undefined) updateData.stock = data.stock;
    if (data.category !== undefined) updateData.category = data.category;

    const product = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!product) {
      this.logger.warn(`Product not found for update: ${id}`);
      throw new Error(`Product not found: ${id}`);
    }

    return this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId });
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product with id: ${id}`);
    
    const result = await this.productModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      this.logger.warn(`Product not found for deletion: ${id}`);
      throw new Error(`Product not found: ${id}`);
    }
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by name: ${name}`);
    
    const product = await this.productModel.findOne({ name }).exec();
    
    if (!product) {
      return null;
    }

    return this.mapToEntity(product as ProductDocument & { _id: Types.ObjectId });
  }
}