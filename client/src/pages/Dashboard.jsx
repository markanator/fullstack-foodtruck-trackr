import { Box, Container, Flex, Heading, List } from '@chakra-ui/react';
import React from 'react';
import { FaListUl } from 'react-icons/fa';
import FavListItem from '../components/Dashboard/FavListItem';
import Layout from '../components/Layout';

const Dashboard = () => (
  <Layout>
    <Flex direction="column">
      <Container maxW="5xl" py="4rem">
        <Heading as="h2" mb="1rem">
          Dashboard
        </Heading>
        <Box pos="relative">
          <Box id="dash__list" background="white" boxShadow="md" rounded="md">
            <Heading
              as="h4"
              fontSize="1.25rem"
              fontWeight="400"
              display="inline-flex"
              m="0"
              padding="1rem 1.5rem"
              color="white"
              background="#424242"
              borderBottom="1px solid #eaeaea"
              borderRadius="4px 4px 0 0"
              w="full"
              alignItems="center"
            >
              <FaListUl style={{ marginRight: '.5rem' }} />
              My Favorite Trucks
            </Heading>
            <List backgroundColor="white" borderRadius="0 0 4px 4px">
              {[1, 2, 3, 4].map((item) => (
                <FavListItem key={item} />
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </Flex>
  </Layout>
);

export default Dashboard;
