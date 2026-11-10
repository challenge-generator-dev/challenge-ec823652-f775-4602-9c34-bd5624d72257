import { useState, useCallback } from 'react';
import axios from 'axios';
import { ProductList } from './features/products/ProductList';
import { ProductForm } from './features/products/ProductForm';
import { ProductEntity, CreateProductDto, UpdateProductDto } from './features/products/types';

const API_BASE_URL = 'http://localhost:3000';

function App() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = useCallback(() => {
    setView('list');
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleEditSuccess = useCallback(() => {
    setView('list');
    setSelectedProduct(null);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleCancel = useCallback(() => {
    setView('list');
    setSelectedProduct(null);
  }, []);

  const handleEdit = useCallback((product: ProductEntity) => {
    setSelectedProduct(product);
    setView('edit');
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = window.confirm('¿Está seguro de que desea eliminar este producto?');
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('No se pudo eliminar el producto. Verifique que no tenga referencias.');
    }
  }, []);

  const handleCreateSubmit = useCallback(async (data: CreateProductDto | UpdateProductDto): Promise<ProductEntity> => {
    const response = await axios.post<ProductEntity>(`${API_BASE_URL}/products`, data);
    return response.data;
  }, []);

  const handleUpdateSubmit = useCallback(async (data: CreateProductDto | UpdateProductDto): Promise<ProductEntity> => {
    if (!selectedProduct) {
      throw new Error('No hay producto seleccionado para actualizar');
    }
    const response = await axios.put<ProductEntity>(`${API_BASE_URL}/products/${selectedProduct.id}`, data);
    return response.data;
  }, [selectedProduct]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Gestión de Productos</h1>
      </header>
      
      <main className="app__main">
        {view === 'list' && (
          <>
            <div className="app__actions">
              <button 
                className="btn btn--primary"
                onClick={() => setView('create')}
              >
                Nuevo Producto
              </button>
            </div>
            <ProductList
              key={refreshKey}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
        
        {view === 'create' && (
          <ProductForm
            onSuccess={handleCreateSuccess}
            onCancel={handleCancel}
            onSubmit={handleCreateSubmit}
          />
        )}
        
        {view === 'edit' && selectedProduct && (
          <ProductForm
            product={selectedProduct}
            onSuccess={handleEditSuccess}
            onCancel={handleCancel}
            onSubmit={handleUpdateSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;