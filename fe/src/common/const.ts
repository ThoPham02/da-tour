export const USER_ROLES = {
  GUEST: 0,
  ADMIN: 1,
  USER: 2,
};

export const API_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const DEFAULT_MESSAGE = {
  PENDING: "Đang xử lý...",
  SUCCESS: "Xử lý thành công!",
  ERROR: "Lỗi hệ thống! Xin vui lòng thử lại!",
  SESSION_EXPIRED: "Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại!",
};

export const HANDLE_ERROR_CODE = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,

  TAI_KHOAN_TON_TAI: 10000,
  SAI_MAT_KHAU: 10001,
  SAI_TAI_KHOAN: 10002,
};

export const HANDLE_ERROR_MESSAGE = {
  [HANDLE_ERROR_CODE.UNAUTHORIZED]: "Không có quyền truy cập",
  [HANDLE_ERROR_CODE.FORBIDDEN]: "Không có quyền truy cập",
  [HANDLE_ERROR_CODE.NOT_FOUND]: "Không tìm thấy trang",
  [HANDLE_ERROR_CODE.INTERNAL_SERVER]: "Lỗi server",

  [HANDLE_ERROR_CODE.TAI_KHOAN_TON_TAI]: "Email đã tồn tại!",
  [HANDLE_ERROR_CODE.SAI_TAI_KHOAN]:
    "Thông tin tài khoản hoặc mật khẩu không chính xác!",
  [HANDLE_ERROR_CODE.SAI_MAT_KHAU]:
    "Thông tin tài khoản hoặc mật khẩu không chính xác!",
};

export const TOUR_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  SOLD_OUT: 3,
};

export const TOUR_LOCATION = {
  ALL: 0,
  GREAT_WALL: 1,
  TERRACOTTA_WARRIORS: 2,
  SHANGHAI_CITY: 3,
  FORBIDDEN_CITY: 4,
  ZHANGJIAJIE: 5,
  GUILIN_CRUISE: 6,
  CHENGDU_PANDA: 7,
  POTALA_PALACE: 8,
  WEST_LAKE: 9,
  THE_BUND: 10,
  YELLOW_MOUNTAIN: 11,
  JIUZHAIGOU: 12,
  SUZHOU_GARDENS: 13,
  EVEREST_TIBET: 14,
  HONGKONG_SKYLINE: 15,
  LIJIANG: 16,
  DUNHUANG_CAVES: 17,
  YANGSHUO: 18,
  SUMMER_PALACE: 19,
  SILK_ROAD_KASHGAR: 20,
};

export const TOUR_LOCATION_LABELS = {
  [TOUR_LOCATION.ALL]: "All Locations",
  [TOUR_LOCATION.GREAT_WALL]: "Great Wall Explorer",
  [TOUR_LOCATION.TERRACOTTA_WARRIORS]: "Terracotta Warriors & Xi'an",
  [TOUR_LOCATION.SHANGHAI_CITY]: "Shanghai City Experience",
  [TOUR_LOCATION.FORBIDDEN_CITY]: "Forbidden City, Beijing",
  [TOUR_LOCATION.ZHANGJIAJIE]: "Zhangjiajie National Forest Park",
  [TOUR_LOCATION.GUILIN_CRUISE]: "Guilin & Li River Cruise",
  [TOUR_LOCATION.CHENGDU_PANDA]: "Chengdu Panda Base",
  [TOUR_LOCATION.POTALA_PALACE]: "Potala Palace, Lhasa",
  [TOUR_LOCATION.WEST_LAKE]: "West Lake, Hangzhou",
  [TOUR_LOCATION.THE_BUND]: "The Bund, Shanghai",
  [TOUR_LOCATION.YELLOW_MOUNTAIN]: "Yellow Mountain (Huangshan)",
  [TOUR_LOCATION.JIUZHAIGOU]: "Jiuzhaigou Valley",
  [TOUR_LOCATION.SUZHOU_GARDENS]: "Suzhou Classical Gardens",
  [TOUR_LOCATION.EVEREST_TIBET]: "Mount Everest Base Camp (Tibet side)",
  [TOUR_LOCATION.HONGKONG_SKYLINE]: "Hong Kong Skyline & Victoria Peak",
  [TOUR_LOCATION.LIJIANG]: "Lijiang Old Town",
  [TOUR_LOCATION.DUNHUANG_CAVES]: "Dunhuang Mogao Caves",
  [TOUR_LOCATION.YANGSHUO]: "Yangshuo Countryside",
  [TOUR_LOCATION.SUMMER_PALACE]: "Summer Palace, Beijing",
  [TOUR_LOCATION.SILK_ROAD_KASHGAR]: "Silk Road Adventure (Kashgar)",
}

export const ORDER_STATUS = {
  ALL: 0,
  PENDING: 1,
  CONFIRMED: 2,
  CANCELLED: 3,
  COMPLETED: 4,
};

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.ALL]: "All",
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.CONFIRMED]: "Confirmed",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
  [ORDER_STATUS.COMPLETED]: "Completed",
};

