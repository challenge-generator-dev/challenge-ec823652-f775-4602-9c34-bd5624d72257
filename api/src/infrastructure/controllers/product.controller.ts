import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Logger,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Product with duplicate name' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.log(`POST /products - Creating product: ${createProductDto.name}`);
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity> {
    this.logger.log(`GET /products/${id}`);
    return this.productService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [ProductEntity] })
  async getAll(): Promise<ProductEntity[]> {
    this.logger.log('GET /products - Fetching all products');
    return this.productService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`PUT /products/${id} - Updating product`);
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product UUID', type: String })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`DELETE /products/${id}`);
    return this.productService.delete(id);
  }
}