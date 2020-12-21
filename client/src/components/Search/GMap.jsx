/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Heading,
  IconButton,
  Image,
  Input,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useState } from 'react';
import { IoMdLocate } from 'react-icons/io';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { Link as RLink } from 'react-router-dom';
// locals
import { useTrucksQuery } from '../../RQ/query/useTrucksQuery';
import mapStyles from './mapStyles';
import DefaultTruckImage from '../../assets/default_truck.webp';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 41.88553,
  lng: -87.61741,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

// ? Use Precise Location
export function Locate({ panTo }) {
  return (
    <IconButton
      aria-label="Locate Me"
      icon={<IoMdLocate style={{ fontSize: '1.25rem' }} />}
      colorScheme="red"
      m="1rem"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            // console.log(coords);
            panTo({
              lat: coords.latitude,
              lng: coords.longitude,
            });
          },
          () => null,
          options
        );
      }}
    />
  );
}

//! MAIN FUNCTION
export default function GMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });
  const {
    data: truckData,
    isError,
    isLoading: trucksLoading,
  } = useTrucksQuery();

  const [selected, setSelected] = useState(null);

  // retain state without causing rerender
  const mapRef = React.useRef();
  // access anywher in code and won't cause rerenders
  const mapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return <p>Error Loading Map</p>;
  if (!isLoaded) return <p>Loading Map</p>;

  return (
    <Box w="full" h="full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={mapLoad}
        style={{
          position: 'relative',
        }}
      >
        <SearchBar panTo={panTo} />
        <Locate panTo={panTo} />
        {/* asdasda */}
        {truckData &&
          truckData.map((truck) => (
            <Marker
              key={truck.name}
              position={{
                lat: truck.latitude,
                lng: truck.longitude,
              }}
              // icon={<FaMapMarkerAlt />}
              onClick={() => {
                // console.log(truck);
                setSelected(truck);
              }}
            />
          ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.latitude,
              lng: selected.longitude,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <Box
              className="truckInfoBox"
              backgroundColor="#fff"
              rounded="md"
              pos="relative"
            >
              <Link
                as={RLink}
                to={`/truck/${selected.id}`}
                title="View Truck details"
                pos="relative"
                h="full"
                display="block"
              >
                <Image
                  src={selected.hero_image || DefaultTruckImage}
                  alt={selected.name}
                  w="100%"
                  maxW="270px !important"
                  height="180px"
                  borderRadius="4px 4px 0 0"
                  objectFit="cover"
                />
              </Link>
              <Heading
                as="h3"
                color="#444"
                fontSize="1.25rem"
                fontWeight="600"
                py=".5rem"
              >
                {selected.name}
              </Heading>
              <Text fontSize=".875rem">
                {`${selected.description.slice(0, 40)}...`}
              </Text>
            </Box>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </Box>
  );
}

// eslint-disable-next-line react/prop-types
function SearchBar({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 44, lng: () => -87.7 },
      radius: 200 * 1000,
    },
  });

  return (
    <Container
      className="searchListings"
      maxW="6xl"
      display="block"
      pos="absolute"
      bottom="60px"
      top="85%"
      left="50%"
      transform="translate(-50%, -50%)"
      pb="0"
      zIndex="999"
      mx="auto"
    >
      <Box
        as={Combobox}
        background="white"
        rounded="5px 5px 0 0 "
        onSelect={async (location) => {
          setValue(location, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address: location });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (err) {
            console.log(err);
          }
          // console.log(location);
        }}
      >
        <Input
          as={ComboboxInput}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="enter a city or truck category"
          rounded="5px"
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
    </Container>
  );
}
