import { location } from "../assets/data/location";

export function getDestinationNameById(id: number): string {
  const destination = location.find((dest) => dest.id === id);
  return destination?.name ? destination.name : "";
}

export function getTimeStamp(dateString: string): number {
  if (!dateString) {
    return 0;
  }
  return new Date(dateString).getTime();
}
