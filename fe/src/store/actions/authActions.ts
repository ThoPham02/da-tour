import { apiLogin, apiRegister, ApiResponse, AuthPayload } from "../services/authService";
import actionTypes from "./actionTypes";
import { Dispatch } from "redux";

// Đăng ký
export const register = (payload: AuthPayload) => async (dispatch: Dispatch) => {
  try {
    const data: ApiResponse = await apiRegister(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};

// Đăng nhập
export const login = (payload: AuthPayload) => async (dispatch: Dispatch) => {
  try {
    const data: ApiResponse = await apiLogin(payload);
    if (data?.result.code === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

// Đăng xuất
export const logout = () => ({
  type: actionTypes.LOGOUT,
});

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = () => ({
  type: actionTypes.GET_CURRENT_USER,
});

