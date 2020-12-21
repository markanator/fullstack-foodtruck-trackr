/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable no-multi-str */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  List,
  ListItem,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { useLoadScript } from '@react-google-maps/api';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link as RLink } from 'react-router-dom';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
// locals
import Layout from '../components/Layout';
import { CreateTruckSchema } from '../Forms/Schemas/CreateTruckSchema';
import { useCreateTruckMutation } from '../RQ/mutations/useCreateTruckMutation';

const libraries = ['places'];

// ! MAIN EXPORT
export default function CreateTruckForm() {
  const queryClient = useQueryClient();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [latLng, setLatLng] = useState({ lat: 43.0, lng: -87.0 });
  const [heroImg, setHeroImg] = useState('');
  const [truckDeets, setTruckDeets] = useState({ id: null });

  const cuisineTypes = [
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
  ];

  const handleLatLngChange = (e) => {
    setLatLng({ ...latLng, [e.target.name]: e.target.value });
  };

  const uploadFile = async (e) => {
    console.log('uploading...');
    const { files } = e.target;
    if (files[0].size > 1048576) {
      alert('Image size larger than 1MB.');
      console.log('file too big, not uploaded');
      return;
    }

    const imgData = new FormData();
    imgData.append('file', files[0]);
    imgData.append('upload_preset', 'foodtrucks');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dmh43eiaf/image/upload',
      {
        method: 'POST',
        body: imgData,
      }
    );
    const file = await res.json();
    // console.log('uploaded file:::', file);
    setHeroImg(file.secure_url);
  };

  const { mutate, isSuccess, isLoading, isIdle } = useCreateTruckMutation();

  const handleSubmit = (values) => {
    const truck = {
      ...values,
      address: value,
      lat: latLng.lat,
      lng: latLng.lng,
      hero_image: heroImg,
    };
    mutate(truck, {
      onSuccess: (deets) => {
        // console.log('inner RQ succes!', deets);
        setTruckDeets({
          ...deets.data,
        });
        queryClient.setQueryData(['truck', deets?.data.id], deets?.data);
      },
    });
  };

  return (
    <Layout>
      <Box background="#f7f9fc">
        <Container maxW="5xl" py="4rem">
          <Formik
            initialValues={{
              name: '',
              cuisine_type: '',
              price_range: '',
              description: '',
              arrival_time: '',
              departure_time: '',
            }}
            validationSchema={CreateTruckSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* FIRST SECTION = TRUCK DETAILS */}
                <Flex
                  direction="column"
                  background="#fff"
                  rounded="md"
                  mb="2rem"
                  overflow="hidden"
                  boxShadow="md"
                  w="full"
                >
                  <Flex
                    w="full"
                    pos="relative"
                    borderBottom="1px solid #eceef3"
                    padding="1rem 1.5rem 1rem"
                  >
                    <Heading fontSize="1rem">Create a Truck</Heading>
                  </Flex>
                  <Box w="100%" padding="1rem 1.25rem 1.25rem">
                    {/* Name */}
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          mb="1rem"
                        >
                          <FormLabel htmlFor="email">Name</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            id="name"
                            name="name"
                            bg="white"
                            placeholder="Truck Name"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* CUISINE TYPE */}
                    <Field name="cuisine_type">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.cuisine_type &&
                            form.touched.cuisine_type
                          }
                          mb="1rem"
                        >
                          <FormLabel htmlFor="cuisine_type">
                            Food Type
                          </FormLabel>
                          <Select
                            {...field}
                            type="text"
                            id="cuisine_type"
                            name="cuisine_type"
                            bg="white"
                            placeholder="Select a Food Type"
                          >
                            {/* options */}
                            {cuisineTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.cuisine_type}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* PRICE RANGE */}
                    <Field name="price_range">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.price_range && form.touched.price_range
                          }
                          mb="1rem"
                        >
                          <FormLabel htmlFor="price_range">
                            Price Range
                          </FormLabel>
                          <Select
                            {...field}
                            id="price_range"
                            name="price_range"
                            bg="white"
                            placeholder="Select a Price Range"
                          >
                            <option value="$">$</option>
                            <option value="$$">$$</option>
                            <option value="$$$">$$$</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.price_range}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* Description */}
                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.description && form.touched.description
                          }
                          mb="1rem"
                        >
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <Textarea
                            {...field}
                            id="description"
                            name="description"
                            bg="white"
                            height={200}
                            resize="none"
                            placeholder="Truck description..."
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Flex>
                {/* SECOND SECTION = IMAGERY */}
                <Flex
                  direction="column"
                  background="#fff"
                  rounded="md"
                  mb="2rem"
                  overflow="hidden"
                  boxShadow="md"
                  w="full"
                >
                  <Flex
                    w="full"
                    pos="relative"
                    borderBottom="1px solid #eceef3"
                    padding="1rem 1.5rem 1rem"
                  >
                    <Heading fontSize="1rem">Featured Image</Heading>
                  </Flex>
                  <Box w="100%" padding="1rem 1.25rem 1.25rem">
                    {/* Image */}
                    <Field name="hero_image">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.hero_image && form.touched.hero_image
                          }
                          mb="1rem"
                        >
                          <FormLabel htmlFor="hero_image">
                            Description
                          </FormLabel>
                          <Input
                            {...field}
                            type="file"
                            id="hero_image"
                            name="hero_image"
                            bg="white"
                            py=".25rem"
                            placeholder="Upload an image."
                            accept="image/*"
                            onChange={uploadFile}
                          />
                          <FormErrorMessage>
                            {form.errors.hero_image}
                          </FormErrorMessage>
                          <Text
                            fontSize=".5rem"
                            color="gray.400"
                            textAlign="center"
                          >
                            Image must be smaller than 1MB
                          </Text>
                        </FormControl>
                      )}
                    </Field>
                    {heroImg && (
                      <Image
                        src={heroImg}
                        alt="your food truck"
                        mx="auto"
                        w={200}
                        h={150}
                        objectFit="cover"
                      />
                    )}
                  </Box>
                </Flex>
                {/* THIRD SECTION = LOCATION */}
                <Flex
                  direction="column"
                  background="#fff"
                  rounded="md"
                  mb="2rem"
                  overflow="hidden"
                  boxShadow="md"
                  w="full"
                >
                  <Flex
                    w="full"
                    pos="relative"
                    borderBottom="1px solid #eceef3"
                    padding="1rem 1.5rem 1rem"
                  >
                    <Heading fontSize="1rem">Location</Heading>
                  </Flex>
                  <Box
                    as={Combobox}
                    w="100%"
                    padding="1rem 1.25rem 0"
                    onSelect={async (location) => {
                      setValue(location, false);
                      clearSuggestions();
                      try {
                        const results = await getGeocode({ address: location });
                        const { lat, lng } = await getLatLng(results[0]);
                        setLatLng({ lat, lng });
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    <Input
                      as={ComboboxInput}
                      value={value}
                      placeholder="e.g 123 Main St"
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      disabled={!isLoaded && !ready}
                      mb="1rem"
                    />
                    <ComboboxPopover style={{ borderRadius: '5px' }}>
                      <List as={ComboboxList} borderRadius="5px" boxShadow="lg">
                        {status === 'OK' &&
                          data.map(({ description }) => (
                            <ListItem
                              as={ComboboxOption}
                              key={description}
                              value={description}
                              background="white"
                              py=".25rem"
                              px=".875rem"
                              fontSize="1rem"
                              _hover={{
                                background: '#e2e2e2',
                                cursor: 'pointer',
                              }}
                            />
                          ))}
                      </List>
                    </ComboboxPopover>
                  </Box>
                  {/* LAT LNG */}
                  <Box
                    display="flex"
                    direction="row"
                    w="100%"
                    padding="0 1.25rem 1.25rem"
                    mb=".5rem"
                  >
                    <Flex direction="column" w={1 / 2} mr="1rem">
                      <FormLabel htmlFor="lat">Lat:</FormLabel>
                      <Input
                        type="text"
                        id="lat"
                        name="lat"
                        // isDisabled
                        onChange={handleLatLngChange}
                        value={latLng.lat}
                        placeholder="e.g 47.000"
                      />
                    </Flex>
                    <Flex direction="column" w={1 / 2} ml="1rem">
                      <FormLabel htmlFor="lng">Lng:</FormLabel>
                      <Input
                        type="text"
                        id="lng"
                        name="lng"
                        // isDisabled
                        onChange={handleLatLngChange}
                        value={latLng.lng}
                        placeholder="e.g -87.000"
                      />
                    </Flex>
                  </Box>
                </Flex>
                {/* FOURTH SECTION = TIME DETAILS */}
                <Flex
                  direction="column"
                  background="#fff"
                  rounded="md"
                  mb="2rem"
                  overflow="hidden"
                  boxShadow="md"
                  w="full"
                >
                  <Flex
                    w="full"
                    pos="relative"
                    borderBottom="1px solid #eceef3"
                    padding="1rem 1.5rem 1rem"
                  >
                    <Heading fontSize="1rem">Business Hours</Heading>
                  </Flex>
                  <Box
                    display="flex"
                    direction="row"
                    w="100%"
                    padding="1rem 1.25rem 1.25rem"
                  >
                    {/* ARRIVAL TIME */}
                    <Flex w={1 / 2} mr=".5rem">
                      <Field name="arrival_time">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.arrival_time &&
                              form.touched.arrival_time
                            }
                            mb="1rem"
                          >
                            <FormLabel htmlFor="arrival_time">
                              Arrival Time
                            </FormLabel>
                            <Input
                              {...field}
                              type="datetime-local"
                              id="arrival_time"
                              name="arrival_time"
                              bg="white"
                              py=".25rem"
                            />
                            <FormErrorMessage>
                              {form.errors.arrival_time}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w={1 / 2} ml=".5rem">
                      <Field name="departure_time">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.departure_time &&
                              form.touched.departure_time
                            }
                            mb="1rem"
                          >
                            <FormLabel htmlFor="departure_time">
                              Departure Time
                            </FormLabel>
                            <Input
                              {...field}
                              type="datetime-local"
                              id="departure_time"
                              name="departure_time"
                              bg="white"
                              py=".25rem"
                            />
                            <FormErrorMessage>
                              {form.errors.departure_time}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  </Box>
                </Flex>
                {/* FINAL BUTTON */}
                <Container
                  display="flex"
                  flexDirection="column"
                  mx="auto"
                  alignItems="center"
                  w="full"
                >
                  <Button
                    type="submit"
                    colorScheme="red"
                    color="white"
                    size="lg"
                    m="auto"
                    mb="1rem"
                    disabled={isSuccess}
                  >
                    {isLoading
                      ? 'Submitting...'
                      : isSuccess
                      ? 'Truck Created!'
                      : isIdle
                      ? 'Submit'
                      : null}
                  </Button>
                  {isSuccess ? (
                    <Button
                      as={RLink}
                      to={`/truck/${truckDeets.id}`}
                      type="button"
                      colorScheme="green"
                      color="white"
                      size="lg"
                      m="auto"
                    >
                      View Truck
                    </Button>
                  ) : null}
                </Container>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Layout>
  );
}
