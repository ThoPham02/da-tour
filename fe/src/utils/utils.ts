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

export function getDate(timestamp: number): string {
  if (timestamp === 0 || !timestamp) {
    return "";
  }

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

