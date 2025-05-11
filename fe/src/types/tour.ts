export interface Activity {
  id: number;
  // name: string;

  title: string;
  detail?: string;
}

export interface Service {
  id: number;
  // name: string;

  // response
  title?: string;
  description?: string;
}

export interface Itinerary {
  id: number;
  title: string;
  description: string;
  name?: string
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
  id?: number;
  code?: string;
  tourId: number;
  customer: Customer;
  quantity: number;
  totalPrice: number;
  status?: number;
  createDate?: number;
  tourName?: string;
  fullName?: string;
  tourDetail?: Tour;
  departureDate?: number;
}
