export interface Activity {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface Itinerary {
  id: number;
  dayNumber: number;
  title: string;
  description: string;
}

export interface Tour {
  id?: number;
  image: string;
  name: string;
  description: string;
  duration: number;
  location: number;
  overview: string;
  activities?: Activity[];
  services?: Service[];
  itinerary?: Itinerary[];
  price: number;
  quantity: number;
  remain?: number;
  status?: number;
  departureDate: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  tourId: number;
  customer: Customer;
  quantity: number;
  totalAmount: number;
}