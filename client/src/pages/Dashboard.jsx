import { Box, Container, Flex, Heading, List } from '@chakra-ui/react';
import React from 'react';
import {
  FaChartLine,
  FaListUl,
  FaMapMarkerAlt,
  FaRegUser,
} from 'react-icons/fa';
import DEFIMG from '../assets/random_street.jpg';
import DashStatCard from '../components/Dashboard/DashStatCard';
// locals
import FavListItem from '../components/Dashboard/FavListItem';
import Layout from '../components/Layout';
import { useGetSelfQuery } from '../RQ/query/useGetSelfQuery';

const Dashboard = () => {
  const { data, isLoading, isError } = useGetSelfQuery();

  if (isLoading) {
    return (
      <Layout>
        <Flex direction="column" pos="relative" bg="gray.100">
          <Flex
            className="page__title"
            flexDirection="column"
            flexWrap="wrap"
            pos="relative"
            w="full"
            h="200px"
            background="#f4f5f7"
            textAlign="left"
            justifyContent="center"
            alignItems="center"
            bgRepeat="no-repeat"
            backgroundImage={`url('${DEFIMG}')`}
            backgroundSize="cover !important"
            backgroundPosition="center"
          >
            {/* test */}
            <Container m="auto" maxW="6xl" zIndex="2" color="white">
              <Heading as="h2" mb="1rem">
                Loading...
              </Heading>
            </Container>
          </Flex>
        </Flex>
      </Layout>
    );
  }
  if (isError) {
    return (
      <Layout>
        <Flex direction="column" pos="relative" bg="gray.100">
          <Flex
            className="page__title"
            flexDirection="column"
            flexWrap="wrap"
            pos="relative"
            w="full"
            h="200px"
            background="#f4f5f7"
            textAlign="left"
            justifyContent="center"
            alignItems="center"
            bgRepeat="no-repeat"
            backgroundImage={`url('${DEFIMG}')`}
            backgroundSize="cover !important"
            backgroundPosition="center"
          >
            {/* test */}
            <Container m="auto" maxW="6xl" zIndex="2" color="white">
              <Heading as="h2" mb="1rem">
                Error...
              </Heading>
            </Container>
          </Flex>
        </Flex>
      </Layout>
    );
  }

  const trucks =
    data?.user_role === 'operator' ? data?.ownedTrucks : data?.favoriteTrucks;

  console.log('usr deets:::', data);
  return (
    <Layout>
      <Flex direction="column" pos="relative" bg="gray.100">
        {/* PAGE TITLE */}
        <Flex
          className="page__title"
          flexDirection="column"
          flexWrap="wrap"
          pos="relative"
          w="full"
          h="200px"
          background="#f4f5f7"
          textAlign="left"
          justifyContent="center"
          alignItems="center"
          bgRepeat="no-repeat"
          backgroundImage={`url('${DEFIMG}')`}
          backgroundSize="cover !important"
          backgroundPosition="center"
        >
          {/* test */}
          <Container m="auto" maxW="6xl" zIndex="2" color="white">
            <Heading as="h2" mb="1rem">
              Dashboard
            </Heading>
          </Container>
        </Flex>
        <Container maxW="5xl" py="4rem">
          {/* OPERATOR CARDS */}
          {data && data.user_role === 'operator' ? (
            <Flex direction="row" flexWrap="wrap" justifyContent="space-evenly">
              <DashStatCard
                color="#1baf65"
                number={trucks.length}
                text="Active Listings"
                Icon={FaMapMarkerAlt}
              />
              <DashStatCard
                color="#f39f00"
                number={data.totalTruckViews}
                text="Total Views"
                Icon={FaChartLine}
              />
              <DashStatCard
                color="#002758"
                number={data.totalTruckReviews}
                text="Total Reviews"
                Icon={FaRegUser}
              />
            </Flex>
          ) : null}
          <Box pos="relative">
            {/* TRUCK LIST */}
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
                {data && data.user_role === 'operator'
                  ? 'My Listings'
                  : 'My Favorites'}
              </Heading>
              <List backgroundColor="white" borderRadius="0 0 4px 4px">
                {trucks.map((truck, idx) => (
                  <FavListItem
                    key={`truck-${truck.name}-${idx}`}
                    deets={truck}
                  />
                ))}
              </List>
            </Box>
          </Box>
        </Container>
      </Flex>
    </Layout>
  );
};

export default Dashboard;
