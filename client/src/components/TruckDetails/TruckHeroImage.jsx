/* eslint-disable react/prop-types */
import { Box, Image } from '@chakra-ui/react';
import React from 'react';

export default function TruckHeroImage({ src, name }) {
  return (
    <Box as="section" w="full" h="400px" boxShadow="md" maxW="7xl" mx="auto">
      <Image
        src={src}
        alt={name}
        w="full"
        h="inherit"
        objectFit="cover"
        objectPosition="50% 50%"
        bg="#e9e9e9"
      />
    </Box>
  );
}
