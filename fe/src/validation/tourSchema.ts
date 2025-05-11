import * as yup from 'yup';

export const tourSchema = yup.object().shape({
  image: yup.string().required('Tour image is required'),
  name: yup.string().required('Tour name is required').min(3, 'Tour name must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  duration: yup.number().required('Duration is required').min(1, 'Duration must be at least 1 day'),
  location: yup.string().required('Location is required'),
  overview: yup.string().required('Overview is required').min(20, 'Overview must be at least 20 characters'),
  activities: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required()
    })
  ).min(1, 'At least one activity is required'),
  services: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required()
    })
  ).min(1, 'At least one service is required'),
  itinerary: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      dayNumber: yup.number().required(),
      title: yup.string().required('Day title is required'),
      description: yup.string().required('Day description is required'),
      activities: yup.array().of(
        yup.object().shape({
          id: yup.string().required(),
          name: yup.string().required()
        })
      )
    })
  ).min(1, 'At least one day in itinerary is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
  // seats: yup.number().required('Number of seats is required').min(1, 'At least one seat must be available'),
  departureDate: yup.string().required('Departure date is required')
});