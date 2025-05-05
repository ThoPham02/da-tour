import { location } from "../assets/data/location";

export function getDestinationNameById(id: number): string {
    const destination = location.find(dest => dest.id === id);
    return destination?.name ? destination.name : "";
  }
  