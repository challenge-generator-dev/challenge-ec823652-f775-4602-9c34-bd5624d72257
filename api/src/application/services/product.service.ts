import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductNotFoundException, DuplicateProductNameException, ProductAlreadyExistsException } from '../../shared/exceptions/product.exceptions';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly productRepository: ProductRepository) {
    this.logger.log('ProductService inicializado');
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.debug(`Creando producto con nombre: ${createProductDto.name}`);

    if (createProductDto.price < 0) {
      this.logger.warn(`Intento de crear producto con precio negativo: ${createProductDto.price}`);
      throw new BadRequestException('El precio no puede ser negativo');
    }

    const existingProduct = await this.productRepository.findByName(createProductDto.name);
    if (existingProduct) {
      this.logger.warn(`Intento de crear producto con nombre duplicado: ${createProductDto.name}`);
      throw new ConflictException(
        new DuplicateProductNameException(createProductDto.name).getResponse()
      );
    }

    const product = await this.productRepository.create(createProductDto);
    this.logger.log(`Producto creado exitosamente con ID: ${product.id}`);
    return product;
  }

  async findById(id: string): Promise<ProductEntity> {
    this.logger.debug(`Buscando producto por ID: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido');
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      this.logger.warn(`Producto no encontrado con ID: ${id}`);
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }

    this.logger.debug(`Producto encontrado: ${product.name}`);
    return product;
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.debug('Obteniendo todos los productos');
    const products = await this.productRepository.findAll();
    this.logger.log(`Se encontraron ${products.length} productos`);
    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    this.logger.debug(`Actualizando producto con ID: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido');
    }

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      this.logger.warn(`Intento de actualizar producto inexistente con ID: ${id}`);
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }

    if (updateProductDto.name && updateProductDto.name !== existingProduct.name) {
      const productWithSameName = await this.productRepository.findByName(updateProductDto.name);
      if (productWithSameName && productWithSameName.id !== id) {
        this.logger.warn(`Intento de actualizar a nombre duplicado: ${updateProductDto.name}`);
        throw new ConflictException(
          new DuplicateProductNameException(updateProductDto.name).getResponse()
        );
      }
    }

    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      this.logger.warn(`Intento de actualizar a precio negativo: ${updateProductDto.price}`);
      throw new BadRequestException('El precio no puede ser negativo');
    }

    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      this.logger.warn(`Intento de actualizar a stock negativo: ${updateProductDto.stock}`);
      throw new BadRequestException('El stock no puede ser negativo');
    }

    const updatedProduct = await this.productRepository.update(id, updateProductDto);
    this.logger.log(`Producto actualizado exitosamente: ${updatedProduct.name}`);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    this.logger.debug(`Eliminando producto con ID: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del producto es requerido');
    }

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      this.logger.warn(`Intento de eliminar producto inexistente con ID: ${id}`);
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }

    await this.productRepository.delete(id);
    this.logger.log(`Producto eliminado exitosamente: ${id}`);
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    this.logger.debug(`Buscando producto por nombre: ${name}`);
    return this.productRepository.findByName(name);
  }

  async checkProductHasReferences(id: string): Promise<boolean> {
    this.logger.debug(`Verificando referencias del producto: ${id}`);
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(
        new ProductNotFoundException(id).getResponse()
      );
    }
    const hasReferences = product.stock > 0;
    if (hasReferences) {
      this.logger.warn(`Producto ${id} tiene ${product.stock} unidades en stock`);
      throw new ProductAlreadyExistsException(product.name);
    }
    return false;
  }
}