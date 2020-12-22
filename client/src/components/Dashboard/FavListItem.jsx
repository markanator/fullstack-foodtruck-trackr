/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaHamburger, FaMapPin, FaStar, FaStarHalf } from 'react-icons/fa';

import { Link as RLink } from 'react-router-dom';
import FoodTruckImg from '../../assets/foodTruck.jpg';

export default function FavListItem({ deets }) {
  return (
    <ListItem
      padding="1.25rem 1.875rem"
      borderBottom="1px solid #eaeaea"
      transition=".3s"
      pos="relative"
    >
      <Flex py=".125rem" pos="relative">
        {/* IMAGE */}
        <Flex flex="1" maxW="250px" pos="relative">
          <Link
            as={RLink}
            to={`/truck/${deets.id}`}
            w="100%"
            h="100%"
            display="inline-block"
            overflow="hidden"
            pos="relative"
            zIndex="10"
          >
            <Image
              src={deets.hero_image || FoodTruckImg}
              alt={deets.name}
              objectFit="cover"
              w="100%"
              h="100%"
              rounded=".5rem"
              boxShadow="lg"
            />
          </Link>
        </Flex>
        {/* DEETS */}
        <Flex flex="1" pl="1.25rem">
          <Box
            className="deets__inner"
            pos="relative"
            top=".5rem"
            verticalAlign="top"
          >
            <Link as={RLink} to={`/truck/${deets.id}`} display="inline-flex">
              <Heading
                as="h3"
                display="inherit"
                w="auto"
                fontSize="1.25rem"
                bottom="2px"
                pos="relative"
                fontWeight="600"
                m="0"
                lineHeight="1.5rem"
              >
                {deets.name}
              </Heading>
            </Link>
            {/* TYPE */}
            <Flex
              direction="row"
              alignItems="center"
              m=".125rem"
              verticalAlign="sub"
              color="#808080"
            >
              <FaHamburger style={{ marginRight: '.5rem' }} />
              {deets.cuisine_type}
            </Flex>
            {/* LOCATION */}
            <Flex
              direction="row"
              alignItems="center"
              m=".125rem"
              verticalAlign="sub"
              color="#808080"
            >
              <FaMapPin style={{ marginRight: '.5rem' }} />
              {deets.address}
            </Flex>
            {/* Phone?
            <Flex
              direction="row"
              alignItems="center"
              m=".125rem"
              verticalAlign="sub"
              color="#808080"
            >
              <FaPhone style={{ marginRight: '.5rem' }} />
              Phone
            </Flex> */}
            {/* REVIEWS */}
            <Flex
              direction="row"
              alignItems="center"
              mt=".25rem"
              verticalAlign="sub"
              color="#808080"
            >
              <FaStar />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStarHalf style={{ marginLeft: '.5rem' }} />
              <Box
                px="5px"
                py="2px"
                background="#54ba1d"
                rounded="md"
                verticalAlign="middle"
                fontSize=".875rem"
                fontWeight="600"
                textColor="white"
              >
                (4.5)
              </Box>
            </Flex>
            {/* SHORT DESCRIPTION */}
            <Text
              mt="5px"
              fontSize="1rem"
              lineHeight="1.25rem"
              textColor="#848484"
            >
              {deets.description}
            </Text>
          </Box>
        </Flex>
      </Flex>
      {/* <Box>edit deets</Box> */}
    </ListItem>
  );
}
