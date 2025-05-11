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



/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format a date as a string
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getPaymentMethodName = (method: number): string => {
  switch (method) {
    case 1:
      return "Credit Card";
    case 2:
      return "PayPal";
    case 3:
      return "Cash";
    default:
      return "Unknown";
  }
}
