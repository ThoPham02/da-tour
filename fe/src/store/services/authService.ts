import { AxiosResponse } from "axios";
import axios from "../axios";
import { Tour } from "../../types/tour";

// Kiểu dữ liệu chung
export interface AuthPayload {
  email: string;
  password: string;
  fullname?: string;
  phone?: string;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  result: {
    code: number;
    message?: string;
  };
  data?: T;
  [key: string]: any;
}

// Register
export const apiRegister = (payload: AuthPayload): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/register",
        data: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Login
export const apiLogin = (payload: AuthPayload): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "/login",
        data: payload,
      });
      console.log("apiLogin response:", response);

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Get current user info
export const apiGetCurrent = (): Promise<ApiResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/info",
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

type UploadResponse = {
  url: string;
};

export const uploadImage = async (image: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response: AxiosResponse<UploadResponse> = await axios({
      method: "post",
      url: "/upload",
      data: formData,
    });

    return response.data.url;
  } catch (error) {
    return "";
  }
};

type CreateTourResponse = {
  result: {
    code: number;
    message?: string;
  };
};

export const convertTourToFormData = (tour: Tour): FormData => {
  const formData = new FormData();

  formData.append("image", tour.image);
  formData.append("name", tour.name);
  formData.append("description", tour.description);
  formData.append("duration", tour.duration.toString());
  formData.append("location", tour.location.toString());
  formData.append("overview", tour.overview);
  formData.append("price", tour.price.toString());
  formData.append("seats", tour.seats.toString());

  const departureTimestamp = new Date(tour.departureDate).getTime();
  formData.append("departureDate", departureTimestamp.toString());

  // Normalize activities: ensure id is number
  const normalizedActivities = tour.activities.map((a) => ({
    id: Number(a.id),
    title: a.name,
  }));
  formData.append("activities", JSON.stringify(normalizedActivities));

  // Normalize services: ensure id is number
  const normalizedServices = tour.services.map((s) => ({
    id: Number(s.id),
    title: s.name,
  }));
  formData.append("services", JSON.stringify(normalizedServices));

  // Normalize itinerary and nested activities
  const normalizedItinerary = tour.itinerary.map((item) => ({
    id: Number(item.id),
    dayNumber: item.dayNumber,
    name: item.title,
    description: item.description,
  }));
  formData.append("itinerary", JSON.stringify(normalizedItinerary));

  return formData;
};

export const apiCreateTour = async (
  tourData: Tour
): Promise<CreateTourResponse | null> => {
  try {
    const formData = convertTourToFormData(tourData);
    const response: AxiosResponse<CreateTourResponse> = await axios({
      method: "post",
      url: "/tour",
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating tour:", error);
    return null;
  }
};

export const apiFilterTour = async (
  filter: any
): Promise<ApiResponse<Tour[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Tour[]>> = await axios({
      method: "get",
      url: "/tour/filter",
      data: filter,
    });

    return response.data;
  } catch (error) {
    console.error("Error filtering tours:", error);
    throw error;
  }
};
