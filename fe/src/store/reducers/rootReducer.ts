import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import persistReducer from "redux-persist/es/persistReducer";
import type { PersistConfig } from "redux-persist";

import authReducer from "./authReducer";
import appReducer from "./appReducer";

// Type gợi ý: nếu có kiểu cụ thể cho state auth, bạn có thể thay `any` thành `AuthState`
const authConfig: PersistConfig<any> = {
  key: "auth",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["isLogined", "token", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  app: appReducer,
});

export default rootReducer;
