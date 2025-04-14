import actionTypes from "../actions/actionTypes";

// Kiểu cho state
export interface AppState {
  currentPage?: number | string;
}

// Khởi tạo state ban đầu
const initState: AppState = {};

// Kiểu cho action
interface AppAction {
  type: string;
  data?: number | string;
}

const appReducer = (state = initState, action: AppAction): AppState => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE:
      return {
        ...state,
        currentPage: action.data,
      };

    default:
      return state;
  }
};

export default appReducer;
