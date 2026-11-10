import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    public readonly productId?: string,
    public readonly productName?: string,
  ) {
    super(
      {
        statusCode: status,
        message,
        error: 'Product Error',
        ...(productId && { productId }),
        ...(productName && { productName }),
      },
      status,
    );
  }
}

export class ProductNotFoundException extends ProductException {
  constructor(productId: string) {
    super(
      `Product with ID '${productId}' not found`,
      HttpStatus.NOT_FOUND,
      productId,
    );
    this.name = 'ProductNotFoundException';
  }
}

export class ProductAlreadyExistsException extends ProductException {
  constructor(productName: string) {
    super(
      `Product with name '${productName}' already exists`,
      HttpStatus.CONFLICT,
      undefined,
      productName,
    );
    this.name = 'ProductAlreadyExistsException';
  }
}

export class DuplicateProductNameException extends ProductException {
  constructor(productName: string) {
    super(
      `Product with name '${productName}' already exists`,
      HttpStatus.CONFLICT,
      undefined,
      productName,
    );
    this.name = 'DuplicateProductNameException';
  }
}

export class InvalidProductDataException extends ProductException {
  constructor(message: string, validationErrors?: Record<string, string[]>) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = 'InvalidProductDataException';
    if (validationErrors) {
      this['validationErrors'] = validationErrors;
    }
  }
}

export class ProductInUseException extends ProductException {
  constructor(productId: string, referencedBy: string[]) {
    super(
      `Product with ID '${productId}' cannot be deleted as it is referenced by: ${referencedBy.join(', ')}`,
      HttpStatus.CONFLICT,
      productId,
    );
    this.name = 'ProductInUseException';
    this['referencedBy'] = referencedBy;
  }
}

export class InsufficientStockException extends ProductException {
  constructor(productId: string, requestedQuantity: number, availableStock: number) {
    super(
      `Insufficient stock for product '${productId}'. Requested: ${requestedQuantity}, Available: ${availableStock}`,
      HttpStatus.UNPROCESSABLE_ENTITY,
      productId,
    );
    this.name = 'InsufficientStockException';
    this['requestedQuantity'] = requestedQuantity;
    this['availableStock'] = availableStock;
  }
}

export class NegativePriceException extends ProductException {
  constructor(price: number) {
    super(
      `Price cannot be negative. Provided value: ${price}`,
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'NegativePriceException';
    this['providedPrice'] = price;
  }
}

export class InvalidPriceException extends ProductException {
  constructor(price: number) {
    super(
      `Invalid price value: ${price}. Price must be a positive number`,
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'InvalidPriceException';
    this['providedPrice'] = price;
  }
}

export class ProductOperationException extends ProductException {
  constructor(operation: string, originalError: Error) {
    super(
      `Failed to perform '${operation}' operation on product: ${originalError.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = 'ProductOperationException';
    this['operation'] = operation;
    this['originalError'] = originalError.message;
  }
}

export class DatabaseConnectionException extends ProductException {
  constructor(databaseType: string, originalError: Error) {
    super(
      `Failed to connect to ${databaseType} database: ${originalError.message}`,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
    this.name = 'DatabaseConnectionException';
    this['databaseType'] = databaseType;
    this['originalError'] = originalError.message;
  }
}