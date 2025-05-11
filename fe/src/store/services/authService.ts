import { AxiosResponse } from "axios";
import axios from "../axios";
import { Order, Tour } from "../../types/tour";
import { getTimeStamp } from "../../utils/utils";

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
  formData.append("seats", tour.quantity.toString());

  const departureTimestamp = getTimeStamp(tour.departureDate);
  formData.append("departureDate", departureTimestamp.toString());

  // Normalize activities: ensure id is number
  const normalizedActivities = tour?.activities?.map((a) => ({
    id: Number(a.id),
    title: a.name,
  }));
  formData.append("activities", JSON.stringify(normalizedActivities));

  // Normalize services: ensure id is number
  const normalizedServices = tour?.services?.map((s) => ({
    id: Number(s.id),
    title: s.name,
  }));
  formData.append("services", JSON.stringify(normalizedServices));

  // Normalize itinerary and nested activities
  const normalizedItinerary = tour?.itinerary?.map((item) => ({
    id: Number(item.id),
    // dayNumber: item.dayNumber,
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

// export const apiFilterTour = async (
//   filter: any
// ): Promise<ApiResponse<Tour[]>> => {
//   try {
//     const response: AxiosResponse<ApiResponse<Tour[]>> = await axios({
//       method: "get",
//       url: "/tour/filter",
//       params: {
//         ...filter,
//       },
//     });

//     const tours = response.data.data ?? [];

//     const convertedData: ApiResponse<Tour[]> = {
//       ...response.data,
//       data: tours.map((tour) => ({
//         ...tour,
//         itinerary: tour.itineraries?.map((item) => ({
//           id: item.id,
//           title: item.name,
//           dayNumber: 0,
//           description: item.description,
//         })) ?? [],
//       })),
//     };
//     console.log("xxxx", convertedData)

//     return convertedData;
//   } catch (error) {
//     console.error("Error filtering tours:", error);
//     throw error;
//   }
// };
export const apiFilterTour = async (
  filter: any
): Promise<ApiResponse<Tour[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Tour[]>> = await axios({
      method: "get",
      url: "/tour/filter",
      params: {
        ...filter,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error filtering tours:", error);
    throw error;
  }
};


export const apiGetTourById = async (id: number): Promise<Tour | null> => {
  try {
    const response: AxiosResponse<ApiResponse<Tour>> = await axios({
      method: "get",
      url: `/tour/${id}`,
    });

    return response.data.tour || null;
  } catch (error) {
    console.error("Error fetching tour by ID:", error);
    return null;
  }
};

type CreateOrderResponse = {
  result: {
    code: number;
    message?: string;
  };
};

export const apiUpdateTour = async (
  id: number,
  tourData: Tour
): Promise<CreateTourResponse | null> => {
  try {
    const formData = convertTourToFormData(tourData);

    const response: AxiosResponse<CreateTourResponse> = await axios({
      method: "put", 
      url: `/tour/${id}`,
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating tour:", error);
    return null;
  }
};

export const convertOrderToFormData = (order: Order): FormData => {
  const formData = new FormData();

  formData.append("tourID", order.tourId.toString());
  formData.append("fullname", order.customer.name);
  formData.append("email", order.customer.email);
  formData.append("phone", order.customer.phone);
  formData.append("seats", order.quantity.toString());

  return formData;
};

export const apiCreateOrder = async (
  orderData: Order
): Promise<CreateOrderResponse | null> => {
  try {
    const formData = convertOrderToFormData(orderData);

    const response: AxiosResponse<CreateOrderResponse> = await axios({
      method: "post",
      url: "/order",
      data: formData,
    });
    console.log("apiCreateOrder response:", response);

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};

export const apiFilterOrder = async (
  filter: any,
): Promise<ApiResponse<Order[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Order[]>> = await axios({
      method: "get",
      url: "/order/filter",
      params: {
        ...filter,
      },  
    });
    console.log("apiFilterOrder response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error filtering orders:", error);
    throw error;
  }
};

export const apiGetOrderById = async (id: number): Promise<Order | null> => {
  try {
    const response: AxiosResponse<ApiResponse<Order>> = await axios({
      method: "get",
      url: `/order/${id}`,
    });

    const order = {
      tourDetail: response.data.tour,
      id: response.data.order.id,
      code: response.data.order.code,
      tourId: response.data.order.tourID,
      customer: {
        name: response.data.order.fullName,
        email: response.data.order.email,
        phone: response.data.order.phone,
      },
      quantity: response.data.order.quantity,
      totalPrice: response.data.order.totalPrice,
      status: response.data.order.status,
      createDate: response.data.order.createDate,
    } as Order;

    return order
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }
};

export const apiUpdateOrder = async (
  orderID: number,
  orderData: Order
): Promise<CreateOrderResponse | null> => {
  try {
    const formData = convertOrderToFormData(orderData);

    const response: AxiosResponse<CreateOrderResponse> = await axios({
      method: "put",
      url: `/order/${orderID}`,
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};