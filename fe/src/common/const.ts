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
  [TOUR_LOCATION.ALL]: "Tất cả địa điểm",
  [TOUR_LOCATION.GREAT_WALL]: "Khám phá Vạn Lý Trường Thành",
  [TOUR_LOCATION.TERRACOTTA_WARRIORS]: "Chiến binh đất nung & thành phố Tây An",
  [TOUR_LOCATION.SHANGHAI_CITY]: "Trải nghiệm thành phố Thượng Hải",
  [TOUR_LOCATION.FORBIDDEN_CITY]: "Tử Cấm Thành, Bắc Kinh",
  [TOUR_LOCATION.ZHANGJIAJIE]: "Công viên rừng quốc gia Trương Gia Giới",
  [TOUR_LOCATION.GUILIN_CRUISE]: "Quế Lâm & Du ngoạn sông Ly",
  [TOUR_LOCATION.CHENGDU_PANDA]: "Trung tâm gấu trúc Thành Đô",
  [TOUR_LOCATION.POTALA_PALACE]: "Cung điện Potala, Lhasa (Tây Tạng)",
  [TOUR_LOCATION.WEST_LAKE]: "Hồ Tây, Hàng Châu",
  [TOUR_LOCATION.THE_BUND]: "Bến Thượng Hải",
  [TOUR_LOCATION.YELLOW_MOUNTAIN]: "Núi Hoàng Sơn (Hoàng Sơn)",
  [TOUR_LOCATION.JIUZHAIGOU]: "Thung lũng Cửu Trại Câu",
  [TOUR_LOCATION.SUZHOU_GARDENS]: "Vườn cổ điển Tô Châu",
  [TOUR_LOCATION.EVEREST_TIBET]: "Trại căn cứ Everest (Tây Tạng)",
  [TOUR_LOCATION.HONGKONG_SKYLINE]: "Toàn cảnh Hồng Kông & Đỉnh Victoria",
  [TOUR_LOCATION.LIJIANG]: "Phố cổ Lệ Giang",
  [TOUR_LOCATION.DUNHUANG_CAVES]: "Hang Mạc Cao, Đôn Hoàng",
  [TOUR_LOCATION.YANGSHUO]: "Vùng quê Dương Sóc",
  [TOUR_LOCATION.SUMMER_PALACE]: "Di Hòa Viên, Bắc Kinh",
  [TOUR_LOCATION.SILK_ROAD_KASHGAR]: "Hành trình Con đường Tơ lụa tại Kashgar",
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

