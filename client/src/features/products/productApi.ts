import axios from 'axios';
import type { ProductEntity, CreateProductDto, UpdateProductDto } from './types';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  getAllProducts: async (): Promise<ProductEntity[]> => {
    const response = await apiClient.get<ProductEntity[]>('/products');
    return response.data;
  },

  getProductById: async (id: string): Promise<ProductEntity> => {
    const response = await apiClient.get<ProductEntity>(`/products/${id}`);
    return response.data;
  },

  createProduct: async (data: CreateProductDto): Promise<ProductEntity> => {
    const response = await apiClient.post<ProductEntity>('/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: UpdateProductDto): Promise<ProductEntity> => {
    const response = await apiClient.put<ProductEntity>(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};