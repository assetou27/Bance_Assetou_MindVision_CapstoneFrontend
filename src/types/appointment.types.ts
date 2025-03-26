export interface Appointment {
    _id: string;
    user: string | {
      _id: string;
      name: string;
      email: string;
    };
    service: string | {
      _id: string;
      title: string;
      duration: number;
      price: number;
    };
    date: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    notes?: string;
    createdAt: string;
  }
  
  export interface AppointmentFormData {
    serviceId: string;
    date: Date;
    notes?: string;
  }