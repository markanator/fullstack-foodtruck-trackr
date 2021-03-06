/* eslint-disable react/prop-types */
import { Box, Flex, Heading, Image, Link, ListItem } from '@chakra-ui/react';
import React from 'react';
import { IoFastFood } from 'react-icons/io5';
import { Link as RLink } from 'react-router-dom';
// locals
import DefImg from '../../assets/default_truck.webp';

// eslint-disable-next-line react/prop-types
export default function FeatListItem({ deets }) {
  return (
    <ListItem w="auto" m=".5rem" maxW="350px">
      <Box
        w="full"
        mt=".5rem"
        background="#ffffff"
        pos="relative"
        display="block"
        rounded="1rem"
        overflow="hidden"
        boxShadow="lg"
      >
        {/* TOP HALF */}
        <Box
          display="table"
          w="full"
          minH="12rem"
          p="10px"
          rounded="lg"
          overflow="hidden"
          pos="relative"
        >
          <Link
            as={RLink}
            to={`/truck/${deets.id}`}
            className="featimage__overlay"
            pos="relative"
            w="full"
            h="100%"
            display="block"
          >
            <Image
              src={deets.hero_image || DefImg}
              alt={deets.name}
              display="block"
              w="100%"
              h="200px"
              objectFit="cover"
              rounded="lg"
            />
          </Link>
          {/* DEETS */}
          <Box
            display="block"
            m="0"
            pos="absolute"
            left="2rem"
            bottom="2rem"
            color="white"
          >
            <Heading fontSize="1.125rem" fontWeight="500" mb="3px">
              <Link as={RLink} to={`/truck/${deets.id}`}>
                {deets.name}
              </Link>
            </Heading>
          </Box>
        </Box>
        {/* BOT HALF */}
        <Box pos="relative" p="5px 20px 15px" display="table" w="100%">
          <Box flex="1" float="left">
            <Link
              as={RLink}
              to={`/truck/${deets.id}`}
              color="#6d7a8a"
              fontWeight="600"
              display="inline-flex"
              alignItems="center"
            >
              <Flex
                mr=".5rem"
                background="#37b475"
                w="2rem"
                h="2rem"
                rounded="full"
                textAlign="center"
                justifyContent="center"
                alignItems="center"
                color="white"
              >
                <IoFastFood />
              </Flex>
              {deets.cuisine_type}
            </Link>
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
}
