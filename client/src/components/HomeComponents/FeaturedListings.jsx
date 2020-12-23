/* eslint-disable no-nested-ternary */
import { Box, Container, Flex, Heading, List, Text } from '@chakra-ui/react';
import React from 'react';
import BgImg from '../../assets/pattern.png';
import { useFetchTopTrucks } from '../../RQ/query/useFetchTopTrucks';
import FeatListItem from './FeatListItem';

export default function FeaturedListings() {
  const { data, isLoading, isError } = useFetchTopTrucks(3);
  return (
    <Flex
      direction="column"
      py="6rem"
      bg="gray.200"
      backgroundImage={`url('${BgImg}')`}
    >
      <Container maxW="5xl" mx="auto">
        <Flex
          direction="column"
          mx="auto"
          textAlign="center"
          alignItems="center"
        >
          <Box>
            <Heading mb="5px">Most Popular Listings</Heading>
            <Text color="gray.500" mb="5px" fontSize="1.25rem">
              Find new & featured listings for you.
            </Text>
          </Box>
          <Flex mt="2rem">
            <List display="flex" direction="inherit" mx="auto">
              {isLoading
                ? 'LOADING...'
                : isError
                ? 'ERROR'
                : data && data.map((truck) => <FeatListItem deets={truck} />)}
            </List>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
