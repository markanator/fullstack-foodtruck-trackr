import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';
import Axios from 'axios';
import React, { useState } from 'react';
import { FaPhoneAlt, FaRegClock, FaStore } from 'react-icons/fa';
// locals
import { useQuery, useQueryClient } from 'react-query';
import { Link as RLink, useParams } from 'react-router-dom';
import DefaultTruckImage from '../assets/default_truck.webp';
import Layout from '../components/Layout';
import MainDetailsCard from '../components/TruckDetails/MainDetailsCard';
import SingleTruckMap from '../components/TruckDetails/StaticTruckMap';
import TruckHeroImage from '../components/TruckDetails/TruckHeroImage';
import TruckMenuList from '../components/TruckDetails/TruckMenuList';
import TruckSocials from '../components/TruckDetails/TruckSocials';
import TruckTags from '../components/TruckDetails/TruckTags';

//! MAIN EXPORT PAGE
export default function TruckDetails() {
  const { truckID } = useParams();
  const [truck, setTruck] = useState({});
  const queryClient = useQueryClient();

  // react query fetch
  const { isLoading, isError } = useQuery(
    ['truck', parseInt(truckID)],
    async () =>
      Axios.get(
        `${process.env.REACT_APP_HOSTED_BACKEND}/trucks/${truckID}`
      ).then((res) => res.data),
    {
      onSuccess: (data) => {
        setTruck({ ...data });
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  if (isLoading) {
    return <p>Loading Truck Deets...</p>;
  }
  if (isError) {
    return <p>Oops, an error occured, try again later...</p>;
  }
  return (
    <Layout>
      <Flex direction="column" as="main">
        <TruckHeroImage
          src={truck.hero_image || DefaultTruckImage}
          alt={truck.name}
        />
        <Container
          as="section"
          maxW="6xl"
          display="flex"
          flexDirection="row"
          py="4rem"
        >
          <Flex w={2 / 3} backgroundColor="red" direction="column" px="1rem">
            {/* MAIN IMPORTANT DEETS */}
            <MainDetailsCard truck={truck} />
            {/* DESCRIPTION */}
            <TruckSocials truck={truck} />
            {/* TAGS */}
            <TruckTags />
            {/* MENU ITEMS  */}
            <TruckMenuList list={truck.foodItems} />
          </Flex>
          <Flex as="aside" w={1 / 3} bg="blue" direction="column">
            {/* STATIC MAP */}
            <Box
              pos="relative"
              overflow="hidden"
              backgroundColor="gray.100"
              rounded="lg"
              paddingTop="1.5rem"
              border="1px solid #00000015"
              zIndex="1"
              boxShadow="md"
            >
              <Heading
                as="h3"
                display="inline-flex"
                alignItems="center"
                w="full"
                px="1.5rem"
                fontSize="1.25rem"
                fontWeight="600"
                textAlign="left"
                pb="1.125rem"
                borderBottom="1px solid #00000025"
                m="5px 0 0 0"
              >
                <FaStore
                  style={{
                    marginRight: '1rem',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    background: '#ff0122',
                    padding: '10px',
                    borderRadius: '50%',
                  }}
                />
                Location
              </Heading>
              <SingleTruckMap lat={truck.latitude} lng={truck.longitude} />
            </Box>
            {/* BUSSINESS HOURS */}
            <Box
              pos="relative"
              overflow="hidden"
              backgroundColor="gray.100"
              rounded="lg"
              padding="1.5rem"
              border="1px solid #00000015"
              mt="2.125rem"
              zIndex="1"
              boxShadow="md"
            >
              <Heading
                as="h3"
                display="inline-flex"
                alignItems="center"
                w="full"
                fontSize="1.25rem"
                fontWeight="600"
                textAlign="left"
                pb="1.125rem"
                borderBottom="1px solid #00000025"
                m="5px 0 1.125rem 0"
              >
                <FaRegClock
                  style={{
                    marginRight: '1rem',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    background: '#ff0122',
                    padding: '10px',
                    borderRadius: '50%',
                  }}
                />
                Business Hours
              </Heading>
              <List p="0" m="0" fontSize="1rem">
                <ListItem
                  display="inline-flex"
                  justifyContent="space-between"
                  w="full"
                  fontSize="1rem"
                  fontWeight="400"
                  color="gray.600"
                  m="0"
                  padding=".5rem 0"
                  borderBottom="1px solid #00000015"
                  transition="color .2s"
                  cursor="default"
                  _hover={{
                    color: '#ff0122',
                  }}
                >
                  Arrive
                  <Box>09:00 AM - 09:00 PM</Box>
                </ListItem>
                <ListItem
                  display="inline-flex"
                  justifyContent="space-between"
                  w="full"
                  fontSize="1rem"
                  fontWeight="400"
                  color="gray.600"
                  m="0"
                  padding=".5rem 0"
                  borderBottom="1px solid #00000015"
                  transition="color .2s"
                  cursor="default"
                  _hover={{
                    color: '#ff0122',
                  }}
                >
                  Depart
                  <Box>09:00 AM - 09:00 PM</Box>
                </ListItem>
              </List>
            </Box>
            {/* Contact */}
            <Box
              mt="2.125rem"
              pos="relative"
              overflow="hidden"
              backgroundColor="gray.100"
              rounded="lg"
              padding="1.5rem"
              border="1px solid #00000015"
              zIndex="1"
              boxShadow="md"
            >
              <Heading
                as="h3"
                display="inline-flex"
                alignItems="center"
                w="full"
                fontSize="1.25rem"
                fontWeight="600"
                textAlign="left"
                pb="1.125rem"
                borderBottom="1px solid #00000025"
                m="5px 0 1.125rem 0"
              >
                <FaPhoneAlt
                  style={{
                    marginRight: '1rem',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    background: '#ff0122',
                    padding: '10px',
                    borderRadius: '50%',
                  }}
                />
                Point of Contact
              </Heading>
              <Flex direction="row" alignItems="center">
                <Link as={RLink} to="/#">
                  <Image
                    src={truck.truck_photo}
                    alt={truck.name}
                    w="80px"
                    h="80px"
                    rounded="full"
                    mr="1.5rem"
                  />
                </Link>
                <Flex direction="column">
                  <Link as={RLink} to="/#">
                    <Heading as="h4" fontSize="1.125rem">
                      Truck Owner
                    </Heading>
                  </Link>
                  <Box>Posted 3 days ago</Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}
