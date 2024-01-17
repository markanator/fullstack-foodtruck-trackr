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
          w="full"
          textAlign="center"
          alignItems="center"
        >
          <Box>
            <Heading mb="5px">Most Popular Listings</Heading>
            <Text color="gray.500" mb="5px" fontSize="1.25rem">
              Find new & featured listings for you.
            </Text>
          </Box>
          <Flex mt="2rem" w="auto">
            <List
              display="flex"
              flexDirection={['column', 'column', 'row', 'row']}
              w="full"
              mx="auto"
              overflow="hidden"
            >
              {isLoading
                ? 'Dusting off Server. One second...'
                : isError
                ? 'ERROR'
                : data && !isLoading
                ? data?.map((truck) => (
                    <FeatListItem key={truck.id} deets={truck} />
                  ))
                : null}
            </List>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
