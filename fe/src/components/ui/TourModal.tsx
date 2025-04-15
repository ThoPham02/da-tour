import React, { useState, Fragment } from 'react';
import { X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

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

interface TourModalProps {
    isOpen: boolean;
    onClose: () => void;
    tour?: Tour;
    mode: 'add' | 'edit' | 'view';
}

function TourModal({ isOpen, onClose, tour, mode }: TourModalProps) {
    const [formData, setFormData] = useState<Partial<Tour>>(
      tour || {
        name: '',
        destination: '',
        price: 0,
        duration: '',
        status: 'active',
        description: '',
        image: '',
        overview: '',
        schedule: [{ day: 1, activities: '' }],
        services: [''],
        amenities: ['']
      }
    );
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form submitted:', formData);
      onClose();
    };
  
    const addScheduleDay = () => {
      setFormData(prev => ({
        ...prev,
        schedule: [...(prev.schedule || []), { day: (prev.schedule?.length || 0) + 1, activities: '' }]
      }));
    };
  
    const addListItem = (field: 'services' | 'amenities') => {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), '']
      }));
    };
  
    const updateSchedule = (index: number, activities: string) => {
      setFormData(prev => ({
        ...prev,
        schedule: prev.schedule?.map((day, i) => 
          i === index ? { ...day, activities } : day
        )
      }));
    };
  
    const updateListItem = (field: 'services' | 'amenities', index: number, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field]?.map((item: string, i: number) => 
          i === index ? value : item
        )
      }));
    };
  
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between items-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {mode === 'add' ? 'Thêm Tour Mới' : mode === 'edit' ? 'Chỉnh Sửa Tour' : 'Chi Tiết Tour'}
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Title>
  
                  <div className="mt-4">
                    {mode === 'view' ? (
                      <div className="space-y-6">
                        <img src={tour?.image} alt={tour?.name} className="w-full h-64 object-cover rounded-lg" />
                        
                        <div>
                          <h4 className="text-xl font-semibold">{tour?.name}</h4>
                          <p className="text-gray-600 mt-2">{tour?.description}</p>
                        </div>
  
                        <div>
                          <h5 className="font-semibold mb-2">Tổng quan</h5>
                          <p className="text-gray-600">{tour?.overview}</p>
                        </div>
  
                        <div>
                          <h5 className="font-semibold mb-2">Lịch trình</h5>
                          <div className="space-y-4">
                            {tour?.schedule?.map((day) => (
                              <div key={day.day} className="border-b pb-4">
                                <h6 className="font-medium">Ngày {day.day}</h6>
                                <p className="text-gray-600 mt-1">{day.activities}</p>
                              </div>
                            ))}
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold mb-2">Dịch vụ bao gồm</h5>
                            <ul className="list-disc list-inside text-gray-600">
                              {tour?.services?.map((service, index) => (
                                <li key={index}>{service}</li>
                              ))}
                            </ul>
                          </div>
  
                          <div>
                            <h5 className="font-semibold mb-2">Tiện ích</h5>
                            <ul className="list-disc list-inside text-gray-600">
                              {tour?.amenities?.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Tên tour
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Điểm đến
                            </label>
                            <input
                              type="text"
                              value={formData.destination}
                              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Giá
                            </label>
                            <input
                              type="number"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Thời gian
                            </label>
                            <input
                              type="text"
                              value={formData.duration}
                              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Mô tả ngắn
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Tổng quan
                          </label>
                          <textarea
                            value={formData.overview}
                            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lịch trình
                          </label>
                          <div className="space-y-4">
                            {formData.schedule?.map((day, index) => (
                              <div key={index} className="flex gap-4">
                                <div className="w-24 flex-shrink-0">
                                  <span className="block text-sm font-medium text-gray-700">Ngày {day.day}</span>
                                </div>
                                <textarea
                                  value={day.activities}
                                  onChange={(e) => updateSchedule(index, e.target.value)}
                                  rows={2}
                                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={addScheduleDay}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              + Thêm ngày
                            </button>
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Dịch vụ bao gồm
                            </label>
                            {formData.services?.map((service, index) => (
                              <div key={index} className="mb-2">
                                <input
                                  type="text"
                                  value={service}
                                  onChange={(e) => updateListItem('services', index, e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addListItem('services')}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              + Thêm dịch vụ
                            </button>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tiện ích
                            </label>
                            {formData.amenities?.map((amenity, index) => (
                              <div key={index} className="mb-2">
                                <input
                                  type="text"
                                  value={amenity}
                                  onChange={(e) => updateListItem('amenities', index, e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addListItem('amenities')}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              + Thêm tiện ích
                            </button>
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Ảnh tour (URL)
                          </label>
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Trạng thái
                          </label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          >
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Tạm ngưng</option>
                          </select>
                        </div>
  
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                          >
                            {mode === 'add' ? 'Thêm Tour' : 'Lưu Thay Đổi'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }

export default TourModal;