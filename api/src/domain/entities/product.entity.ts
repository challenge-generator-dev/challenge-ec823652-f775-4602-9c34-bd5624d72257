import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class ProductEntity {
  @ApiProperty({ example: '1', description: 'Identificador único del producto' })
  id: string;

  @ApiProperty({ example: 'Laptop Gamer', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1299.99, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad en stock del producto' })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({ example: 'Electrónicos', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Fecha de creación del producto' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Fecha de última actualización del producto' })
  updatedAt: Date;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}