import { IsString, IsNumber, IsOptional, Min, MaxLength, IsEnum, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nombre del producto',
    example: 'Laptop HP',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(1, { message: 'El nombre no puede estar vacío' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Precio del producto',
    example: 1299.99,
    minimum: 0.01,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0' })
  price?: number;

  @ApiPropertyOptional({
    description: 'Cantidad en stock',
    example: 50,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock?: number;

  @ApiPropertyOptional({
    description: 'Categoría del producto',
    example: 'Electronics',
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
  })
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @MaxLength(50, { message: 'La categoría no puede exceder 50 caracteres' })
  @IsEnum(['Electronics', 'Clothing', 'Food', 'Books', 'Other'], {
    message: 'Categoría inválida. Valores permitidos: Electronics, Clothing, Food, Books, Other',
  })
  category?: string;
}