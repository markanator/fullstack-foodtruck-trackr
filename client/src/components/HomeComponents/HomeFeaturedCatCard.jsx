/* eslint-disable react/prop-types */
import { Box, Flex, Heading, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { IoFastFood } from 'react-icons/io5';
import { Link as RLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function HomeFeaturedCatCard({ info }) {
  return (
    <ListItem m={['.125rem', '.5rem', '1rem']} w="full">
      <Flex
        as={RLink}
        to="/"
        direction="column"
        boxShadow="lg"
        rounded="lg"
        px="2rem"
        justifyContent="center"
        alignItems="center"
        bg="white"
        // w="full"
        w={['full', 'full', 'full', 'full']}
        maxW="240px"
        h="200px"
        mt="2rem"
        mx="auto"
      >
        <Box fontSize="2rem" color="red.500" mb="1rem">
          <IoFastFood />
        </Box>
        <Box>
          <Heading fontSize="1.125rem">{info.cuisine_type}</Heading>
          <Text color="gray.400">{info.count} Trucks</Text>
        </Box>
      </Flex>
    </ListItem>
  );
}
