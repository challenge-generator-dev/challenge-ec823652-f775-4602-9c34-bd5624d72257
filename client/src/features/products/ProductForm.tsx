import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productApi } from './productApi';
import type { ProductEntity, CreateProductDto, UpdateProductDto } from './types';

const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  price: z
    .number({ invalid_type_error: 'El precio debe ser un número' })
    .min(0, 'El precio no puede ser negativo'),
  stock: z
    .number({ invalid_type_error: 'El stock debe ser un número' })
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  category: z
    .string()
    .min(1, 'La categoría es requerida')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: ProductEntity | null;
  onSuccess: () => void;
  onCancel: () => void;
  onSubmit?: (data: CreateProductDto | UpdateProductDto) => Promise<ProductEntity>;
}

export function ProductForm({ product, onSuccess, onCancel, onSubmit: externalOnSubmit }: ProductFormProps) {
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          price: product.price,
          stock: product.stock,
          category: product.category,
        }
      : {
          name: '',
          price: 0,
          stock: 0,
          category: '',
        },
  });

  const handleSubmitForm = async (data: ProductFormData) => {
    if (externalOnSubmit) {
      await externalOnSubmit(data);
      onSuccess();
      return;
    }

    try {
      if (isEditing && product) {
        const updateData: UpdateProductDto = {
          name: data.name,
          price: data.price,
          stock: data.stock,
          category: data.category,
        };
        await productApi.updateProduct(product.id, updateData);
      } else {
        const createData: CreateProductDto = {
          name: data.name,
          price: data.price,
          stock: data.stock,
          category: data.category,
        };
        await productApi.createProduct(createData);
      }
      reset();
      onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar el producto';
      alert(message);
    }
  };

  return (
    <div className="product-form">
      <h2>{isEditing ? 'Editar Producto' : 'Crear Producto'}</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="product-form__form">
        <div className="product-form__field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <span className="product-form__error">{errors.name.message}</span>
          )}
        </div>

        <div className="product-form__field">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            aria-invalid={errors.price ? 'true' : 'false'}
          />
          {errors.price && (
            <span className="product-form__error">{errors.price.message}</span>
          )}
        </div>

        <div className="product-form__field">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            {...register('stock', { valueAsNumber: true })}
            aria-invalid={errors.stock ? 'true' : 'false'}
          />
          {errors.stock && (
            <span className="product-form__error">{errors.stock.message}</span>
          )}
        </div>

        <div className="product-form__field">
          <label htmlFor="category">Categoría</label>
          <input
            id="category"
            type="text"
            {...register('category')}
            aria-invalid={errors.category ? 'true' : 'false'}
          />
          {errors.category && (
            <span className="product-form__error">{errors.category.message}</span>
          )}
        </div>

        <div className="product-form__actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="product-form__submit"
          >
            {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="product-form__cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}