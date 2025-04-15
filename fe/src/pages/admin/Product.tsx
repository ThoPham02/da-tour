import { useState } from 'react';
import { 
  Plus,
  Search,
  Edit2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { TourModal } from '../../components/ui';

interface TourSchedule {
  day: number;
  activities: string;
}

interface Tour {
  id: number;
  name: string;
  destination: string;
  price: number;
  duration: string;
  status: 'active' | 'inactive';
  description: string;
  image: string;
  overview?: string;
  schedule?: TourSchedule[];
  services?: string[];
  amenities?: string[];
}

function Product() {
  // const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDestination, setFilterDestination] = useState('all');
  const [currentTourPage, setCurrentTourPage] = useState(1);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    tour?: Tour;
  }>({
    isOpen: false,
    mode: 'view'
  });
  
  const toursPerPage = 6;

  const tours = [
    {
      id: 1,
      name: 'Bắc Kinh 5N4Đ',
      destination: 'Bắc Kinh',
      price: 12000,
      duration: '5 ngày 4 đêm',
      status: 'active' as const,
      description: 'Khám phá Vạn Lý Trường Thành, Tử Cấm Thành và các điểm đến nổi tiếng tại Bắc Kinh',
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=300',
      overview: 'Tour Bắc Kinh 5 ngày 4 đêm sẽ đưa bạn đến với những địa điểm nổi tiếng nhất của thủ đô Trung Quốc. Từ Vạn Lý Trường Thành hùng vĩ đến Tử Cấm Thành cổ kính, từ Thiên An Môn lịch sử đến các hutong đặc trưng.',
      schedule: [
        {
          day: 1,
          activities: 'Đón khách tại sân bay, nhận phòng khách sạn, tham quan Quảng trường Thiên An Môn buổi tối'
        },
        {
          day: 2,
          activities: 'Tham quan Vạn Lý Trường Thành, Di Hòa Viên'
        },
        {
          day: 3,
          activities: 'Tham quan Tử Cấm Thành, Thiên Đàn'
        },
        {
          day: 4,
          activities: 'Tham quan Cung điện Mùa Hè, Chùa Lạt Ma'
        },
        {
          day: 5,
          activities: 'Mua sắm tại Vương Phủ Tỉnh, ra sân bay'
        }
      ],
      services: [
        'Vé máy bay khứ hồi',
        'Khách sạn 4 sao',
        'Bữa ăn theo chương trình',
        'Xe đưa đón riêng',
        'Hướng dẫn viên tiếng Việt'
      ],
      amenities: [
        'Free WiFi',
        'Bảo hiểm du lịch',
        'Nước uống trên xe',
        'Vé tham quan'
      ]
    },
    // ... other tours with similar detailed structure
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination = filterDestination === 'all' || tour.destination === filterDestination;
    return matchesSearch && matchesDestination;
  });

  // Pagination logic
  const indexOfLastTour = currentTourPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentTourPage(pageNumber);
  };

  const destinations = ['Bắc Kinh', 'Thượng Hải', 'Quảng Châu', 'Tô Châu', 'Thành Đô', 'Tây An', 'Trùng Khánh', 'Côn Minh'];

  return (
      <div>
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tour</h1>
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700"
          onClick={() => setModalState({ isOpen: true, mode: 'add' })}
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Tour Mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tìm theo tên tour hoặc điểm đến..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentTourPage(1); // Reset to first page on search
                }}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Điểm đến
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={filterDestination}
              onChange={(e) => {
                setFilterDestination(e.target.value);
                setCurrentTourPage(1); // Reset to first page on filter change
              }}
            >
              <option value="all">Tất cả điểm đến</option>
              {destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentTours.map(tour => (
          <div key={tour.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src={tour.image} 
              alt={tour.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tour.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-blue-600 font-semibold">¥{tour.price.toLocaleString()}</span>
                <span className="text-gray-500">{tour.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  tour.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {tour.status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
                </span>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setModalState({ isOpen: true, mode: 'view', tour })}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setModalState({ isOpen: true, mode: 'edit', tour })}
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => paginate(currentTourPage - 1)}
            disabled={currentTourPage === 1}
            className={`p-2 rounded-lg ${
              currentTourPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentTourPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentTourPage + 1)}
            disabled={currentTourPage === totalPages}
            className={`p-2 rounded-lg ${
              currentTourPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Tour Modal */}
      <TourModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, mode: 'view' })}
        tour={modalState.tour}
        mode={modalState.mode}
      />
      </div>
  );
}

export default Product;