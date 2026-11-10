import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  IsOptional,
  isNumber,
} from 'class-validator';

@ValidatorConstraint({ name: 'positivePrice', async: false })
export class PositivePriceValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (IsOptional(value) || value === undefined || value === null) {
      return true;
    }

    if (!isNumber(value, { allowNaN: false, allowInfinity: false })) {
      return false;
    }

    return value > 0;
  }

  defaultMessage(args: ValidationArguments): string {
    const propertyName = args.property;
    const value = args.value;

    if (value === null || value === undefined) {
      return `${propertyName} should not be null or undefined`;
    }

    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      return `${propertyName} must be a valid number`;
    }

    return `${propertyName} must be a positive number greater than 0, got: ${value}`;
  }
}

export function IsPositivePrice(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol): void {
    registerDecorator({
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      constraints: [],
      validator: PositivePriceValidator,
    });
  };
}

@ValidatorConstraint({ name: 'priceRange', async: false })
export class PriceRangeValidator implements ValidatorConstraintInterface {
  private readonly minPrice: number;
  private readonly maxPrice: number;

  constructor(minPrice: number = 0.01, maxPrice: number = 999999.99) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }

  validate(value: any, args: ValidationArguments): boolean {
    if (IsOptional(value) || value === undefined || value === null) {
      return true;
    }

    if (!isNumber(value, { allowNaN: false, allowInfinity: false })) {
      return false;
    }

    return value >= this.minPrice && value <= this.maxPrice;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Price must be between ${this.minPrice} and ${this.maxPrice}`;
  }
}

export function IsPriceInRange(
  minPrice: number = 0.01,
  maxPrice: number = 999999.99,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol): void {
    registerDecorator({
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      constraints: [minPrice, maxPrice],
      validator: new PriceRangeValidator(minPrice, maxPrice),
    });
  };
}

@ValidatorConstraint({ name: 'validStock', async: false })
export class ValidStockValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (IsOptional(value) || value === undefined || value === null) {
      return true;
    }

    if (!Number.isInteger(value)) {
      return false;
    }

    return value >= 0;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a non-negative integer`;
  }
}

export function IsValidStock(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol): void {
    registerDecorator({
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      constraints: [],
      validator: ValidStockValidator,
    });
  };
}