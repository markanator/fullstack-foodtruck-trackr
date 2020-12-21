/* eslint-disable react/prop-types */
import { Image } from '@chakra-ui/react';
import React from 'react';

export default function StaticTruckMap({ lat, lng }) {
  const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=350x460&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&markers=${lat},${lng}&scale=2`;

  return (
    <Image
      src={staticMap}
      alt="general truck location"
      w="full"
      h="auto"
      objectFit="cover"
    />
  );
}
