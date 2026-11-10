import { useState, useEffect } from 'react';
import { productApi } from './productApi';
import type { ProductEntity } from './types';

interface ProductListProps {
  onEdit: (product: ProductEntity) => void;
  onDelete: (id: string) => void;
}

export function ProductList({ onEdit, onDelete }: ProductListProps) {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productApi.getAllProducts();
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }
    try {
      await productApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      alert(message);
    }
  };

  if (loading) {
    return (
      <div className="product-list__loading">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list__error">
        <p>Error: {error}</p>
        <button onClick={fetchProducts}>Reintentar</button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p>No hay productos registrados</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <table className="product-list__table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td className="product-list__actions">
                <button
                  onClick={() => onEdit(product)}
                  className="product-list__edit-btn"
                  aria-label={`Editar ${product.name}`}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="product-list__delete-btn"
                  aria-label={`Eliminar ${product.name}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}