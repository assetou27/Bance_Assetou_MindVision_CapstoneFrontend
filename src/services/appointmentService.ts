import { api } from './api';
import { Appointment, AppointmentFormData } from '../types/appointment.types';

// Get user appointments
export const getUserAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get('/appointments