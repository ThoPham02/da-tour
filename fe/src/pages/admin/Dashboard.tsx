import {
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';

function Dashboard() {
    return (
      <div >
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Tổng quan</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Tổng đơn hàng</h3>
                <p className="text-2xl font-semibold text-gray-800">1,234</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm ml-1">12% so với tháng trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Doanh thu</h3>
                <p className="text-2xl font-semibold text-gray-800">¥890,000</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm ml-1">8% so với tháng trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Khách hàng mới</h3>
                <p className="text-2xl font-semibold text-gray-800">256</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm ml-1">18% so với tháng trước</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Tỷ lệ chuyển đổi</h3>
                <p className="text-2xl font-semibold text-gray-800">3.2%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm ml-1">2% so với tháng trước</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Đơn hàng gần đây</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#ORD001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nguyễn Văn A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bắc Kinh 5N4Đ</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥12,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Đã thanh toán
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#ORD002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Trần Thị B</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Thượng Hải 4N3Đ</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥9,800</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Đang xử lý
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#ORD003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lê Văn C</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Quảng Châu 3N2Đ</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥7,500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Đã thanh toán
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;