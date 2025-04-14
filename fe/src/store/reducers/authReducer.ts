import actionTypes from "../actions/actionTypes";

// Định nghĩa kiểu cho user (có thể mở rộng)
export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  [key: string]: any;
}

// Định nghĩa kiểu cho state
export interface AuthState {
  isLogined: boolean;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isLogined: false,
  token: null,
  user: null,
};

// Kiểu cho action object
interface AuthAction {
  type: string;
  data?: {
    token?: string;
    user?: User;
  };
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLogined: true,
        token: action.data?.token || null,
        user: action.data?.user || null,
      };

    case actionTypes.LOGIN_FAIL:
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogined: false,
        token: null,
        user: null,
      };

    case actionTypes.UPDATE_CURRENT_USER:
    case actionTypes.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.data?.user || state.user,
      };

    case actionTypes.UPDATE_CURRENT_USER_FAIL:
      return state;

    default:
      return state;
  }
};

export default authReducer;
