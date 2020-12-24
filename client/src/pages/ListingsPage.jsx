/* eslint-disable no-nested-ternary */
/* eslint-disable no-lone-blocks */
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
// locals
import Layout from '../components/Layout';
import GMap from '../components/Search/GMap';
import { TruckListingCard } from '../components/Search/TruckListingCard';
import { useTrucksQuery } from '../RQ/query/useTrucksQuery';
import NewsletterSection from '../components/NewsletterSection';

export default function ListingsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  // fetch trucks
  const { data: trucks, isLoading, isError } = useTrucksQuery(page);
  // fetch cached pageInfo that was set above
  const info = queryClient.getQueryData('pageInfo');

  const handleNextClick = useCallback(() => {
    setPage((old) => old + 1);
  }, []);
  const handlePrevClick = useCallback(() => {
    setPage((old) => old - 1);
  }, []);
  // console.log('render');
  return (
    <Layout>
      <Flex direction="column">
        <Flex
          w="full"
          pos="relative"
          alignItems="center"
          h="505px"
          direction="column"
        >
          {/* MAP & SEARCH */}
          <GMap trucks={trucks} />
        </Flex>{' '}
        <Container maxW="6xl">
          {/* FILTERING */}
          <Flex direction="column">
            <Box
              padding="1rem"
              background="#f9f9f9"
              rounded="lg"
              my="2rem"
              display="inline-block"
              w="full"
              border="1px solid rgba(0,0,0,.05)"
            >
              <Text fontSize="1.125rem" fontWeight="600" color="gray.600">
                {info?.totalTrucks || 100} total trucks
              </Text>
              <Flex display="none">
                {/* SORT LISTINGS */}
                <Menu>
                  <MenuButton
                    colorScheme="red"
                    mr="1rem"
                    as={Button}
                    rightIcon={<FaChevronDown />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                  </MenuList>
                </Menu>
                {/* CATEGORIES */}
                <Menu>
                  <MenuButton
                    colorScheme="red"
                    mr="1rem"
                    as={Button}
                    rightIcon={<FaChevronDown />}
                  >
                    Categories
                  </MenuButton>
                  <MenuList
                    maxH="200px"
                    overflow="hidden"
                    overflowY="scroll"
                    p=".125rem"
                  >
                    <MenuItem>American</MenuItem>
                    <MenuItem>Barbeque</MenuItem>
                    <MenuItem>Chinese</MenuItem>
                    <MenuItem>Dessert</MenuItem>
                    <MenuItem>Filipino</MenuItem>
                    <MenuItem>Greek</MenuItem>
                    <MenuItem>Italian</MenuItem>
                    <MenuItem>Kosher</MenuItem>
                    <MenuItem>Mexican</MenuItem>
                    <MenuItem>Pizza</MenuItem>
                    <MenuItem>Sea Food</MenuItem>
                    <MenuItem>Thai</MenuItem>
                    <MenuItem>Vegan</MenuItem>
                    <MenuItem>Vegetarian</MenuItem>
                    <MenuItem>Other</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              {/* END SEARCH SORTS */}
            </Box>
          </Flex>
          {/* LISTINGS */}
          <Box mx="-1rem" wrap="wrap" className="row" mb="2rem">
            {isLoading ? (
              <Text>Loading...</Text>
            ) : isError ? (
              <Text>Oops, an error occured try again later...</Text>
            ) : trucks ? (
              trucks.map((truck, idx) => (
                <TruckListingCard key={`${idx}-${truck.slug}`} info={truck} />
              ))
            ) : null}
          </Box>
          {/* PAGINATIONS */}
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            mb="4rem"
          >
            <ButtonGroup isAttached mx="auto">
              <Button
                size="lg"
                disabled={info?.prev === null}
                onClick={handlePrevClick}
              >
                Prev
              </Button>
              {/* <Button
                size="lg"
                // disabled={info?.prev === null}
                // onClick={handlePrevClick}
                disabled
              >
                {}
              </Button> */}
              <Button
                size="lg"
                disabled={info?.next === null}
                onClick={handleNextClick}
              >
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </Container>
      </Flex>
      {/* SEND EMAIL */}
      <NewsletterSection bgcolor="#f96825" />
    </Layout>
  );
}
