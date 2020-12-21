import { Box, Container, Flex, Heading, List, Text } from '@chakra-ui/react';
import React from 'react';
import HomeFeaturedCatCard from './HomeFeaturedCatCard';

export default function PopularCatsSection() {
  return (
    <Flex direction="column" py="6rem" bg="gray.100">
      <Container maxW="5xl" mx="auto">
        <Flex
          direction="column"
          mx="auto"
          textAlign="center"
          alignItems="center"
        >
          <Box>
            <Heading mb="5px">Featured Categories</Heading>
            <Text color="gray.500" mb="5px" fontSize="1.25rem">
              Top Truck Categories in the Nation
            </Text>
          </Box>
          <Flex>
            <List display="flex" direction="inherit" mx="auto">
              <HomeFeaturedCatCard />
              <HomeFeaturedCatCard />
              <HomeFeaturedCatCard />
            </List>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
