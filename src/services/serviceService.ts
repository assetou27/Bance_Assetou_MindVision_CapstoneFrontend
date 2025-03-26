import { api } from './api';
import { Service } from '../types/service.types';

// Get all services
export const getAllServices = async (): Promise<Service[]> => {
  const response = await api.get('/services');
  return response.data;
};

// Get service by ID
export const getServiceById = async (id: string): Promise<Service> => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};