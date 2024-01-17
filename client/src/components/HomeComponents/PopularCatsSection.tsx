/* eslint-disable no-nested-ternary */
import { Box, Container, Flex, Heading, List, Text } from '@chakra-ui/react';
import React from 'react';
import { useFetchTopCuisines } from '../../RQ/query/useFetchTopCuisines';
import HomeFeaturedCatCard from './HomeFeaturedCatCard';

export default function PopularCatsSection() {
  const { data, isLoading, isError } = useFetchTopCuisines(3);

  if (isLoading) {
    return (
      <Flex direction="column" py="6rem" bg="gray.100">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" py="6rem" bg="gray.100">
      <Container maxW="5xl" mx="auto">
        <Flex direction="column" mx="auto" textAlign="center" alignItems="center">
          <Box>
            <Heading mb="5px">Featured Categories</Heading>
            <Text color="gray.500" mb="5px" fontSize="1.25rem">
              Top Truck Categories in the Nation
            </Text>
          </Box>
          <Flex w="full">
            <List
              display="flex"
              flexDirection={['column', 'column', 'row', 'row']}
              alignItems="center"
              justifyContent="center"
              mx="auto"
              w="full"
            >
              {isLoading
                ? 'LOADING...'
                : isError
                ? 'ERROR'
                : data && !isLoading
                ? data?.map((cat) => <HomeFeaturedCatCard key={cat.cuisineType} info={cat} />)
                : null}
            </List>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
