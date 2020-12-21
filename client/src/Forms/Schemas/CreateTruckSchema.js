import * as yup from 'yup';

export const CreateTruckSchema = yup.object().shape({
  name: yup.string().min(4, 'Listing name too short!').required(),
  cuisine_type: yup
    .string()
    .oneOf(
      [
        'American',
        'Mexican',
        'Greek',
        'SeaFood',
        'Vegan',
        'Vegetarian',
        'Chinese',
        'Thai',
        'Dessert',
        'Italian',
        'Filipino',
        'Kosher',
      ],
      'Incorrect category type.'
    )
    .required('Please selecte a cuisine type!'),
  price_range: yup.string().required('Please select a price range!'),
  description: yup.string().max(254, 'Description too long!').required(),
  arrival_time: yup.date().required('Please select an arrival time.'),
  departure_time: yup.date().required('Please select a departure time.'),
});
