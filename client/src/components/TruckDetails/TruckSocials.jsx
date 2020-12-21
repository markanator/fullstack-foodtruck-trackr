/* eslint-disable react/prop-types */
import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function TruckSocials({ truck }) {
  return (
    <Flex direction="column">
      <Heading as="h3" my="2rem" className="needs__dash" pos="relative">
        Truck Description
      </Heading>
      <Text fontSize="1rem" lineHeight="1.875rem" textColor="gray.600">
        {truck.description}
      </Text>
      <Stack
        direction="row"
        spacing="1rem"
        py="1rem"
        borderTop="1px solid #e8e8e8"
        borderBottom="1px solid #e8e8e8"
        my="1rem"
      >
        <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
          Twitter
        </Button>
        <Button background="#e1306c" color="white" leftIcon={<FaInstagram />}>
          Instagram
        </Button>
        <Button
          background="#ff0125"
          color="white"
          colorScheme="youtube"
          leftIcon={<FaYoutube />}
        >
          Youtube
        </Button>
      </Stack>
    </Flex>
  );
}
