import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop Gamer', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @ApiProperty({ example: 1299.99, description: 'Precio del producto' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price: number;

  @ApiProperty({ example: 50, description: 'Cantidad en stock del producto' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsPositive({ message: 'El stock debe ser un número positivo' })
  stock: number;

  @ApiProperty({ example: 'Electrónicos', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
  category: string;
}