/* eslint-disable react/prop-types */
import { Badge, Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { FaHeart, FaMapPin, FaPhoneAlt, FaStar } from 'react-icons/fa';

export default function MainDetailsCard({ truck }) {
  return (
    <Flex
      id="title__bar"
      direction="column"
      border="1px solid #00000225"
      backgroundColor="gray.100"
      rounded="lg"
      padding="1.125rem"
      mb="1.25rem"
      boxShadow="md"
    >
      {/* TITLE and CATEGORY */}
      <Heading
        as="h2"
        mb="5px"
        display="flex"
        alignItems="center"
        className="needs__dash"
      >
        {truck.name}
        <Badge
          className="tag"
          textTransform="uppercase"
          ml="1rem"
          mt=".5rem"
          fontSize="sm"
          fontWeight="400"
          letterSpacing=".0125rem"
          px="10px"
          py="5px"
          colorScheme="red"
          variant="solid"
          rounded="4px"
          color="white"
        >
          {truck.cuisine_type}
        </Badge>
      </Heading>
      {/* LOCATION */}
      <Box
        fontSize="1rem"
        m="2px 0"
        mb="5px"
        fontWeight="400"
        display="block"
        color="gray.700"
      >
        <FaMapPin
          style={{
            display: 'inline-block',
            fontSize: '1rem',
            color: 'red',
            marginRight: '.5rem',
            width: '18px',
            fontWeight: '600',
            textAlign: 'center',
            verticalAlign: 'sub',
          }}
        />
        {truck.address || 'No Address Listed.'}
      </Box>
      {/* PHONE */}
      <Box
        fontSize="1rem"
        m="2px 0"
        mb="5px"
        fontWeight="400"
        display="block"
        color="gray.700"
      >
        <FaPhoneAlt
          style={{
            display: 'inline-block',
            fontSize: '1rem',
            color: 'red',
            marginRight: '.5rem',
            width: '18px',
            fontWeight: '600',
            textAlign: 'center',
            verticalAlign: 'sub',
          }}
        />
        (123) 456-7890
      </Box>
      {/* RATINGS */}
      <Box mb="5px">
        Rating:
        <Badge
          top="0px"
          pos="relative"
          color="white"
          padding="1px 5px"
          display="inline-block"
          fontSize=".875rem"
          ml="6px"
          background={truck.averageRating >= 3 ? '#54ba1d' : '#e9e9e9'}
          fontWeight="600"
          lineHeight="1.25rem"
          rounded="4px"
          verticalAlign="middle"
        >
          ({truck.averageRating || 0})
        </Badge>
      </Box>
      {/* TRUCK SOCIALS */}
      <Flex direction="row" pt=".5rem">
        <Button leftIcon={<FaHeart />} colorScheme="red" mr=".5rem">
          Favorite
        </Button>
        <Button leftIcon={<FaStar />} colorScheme="red">
          Review
        </Button>
      </Flex>
    </Flex>
  );
}
