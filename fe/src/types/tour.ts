export interface Activity {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
}

export interface Itinerary {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: Activity[];
}

export interface Tour {
  image: string;
  name: string;
  description: string;
  duration: number;
  location: string;
  overview: string;
  activities: Activity[];
  services: Service[];
  itinerary: Itinerary[];
  price: number;
  seats: number;
  departureDate: string;
}

export interface ValidationErrors {
  [key: string]: string;
}