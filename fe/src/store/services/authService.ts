import { AxiosResponse } from "axios";
import axios from "../axios";

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
      formData.append('file', image);
  
      const response: AxiosResponse<UploadResponse> = await axios({
        method: "post",
        url:"/upload",
        data: formData,
      });
  
      return response.data.url;
    } catch (error) {
      return "";
    }
  };
