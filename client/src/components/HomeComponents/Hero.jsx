import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import { Link as RLink } from 'react-router-dom';
import BgImg from '../../assets/searchBg.jpg';

export default function Hero() {
  const { errors, register } = useForm();

  return (
    <Flex
      className="home__hero"
      w="full"
      h="660px"
      bgImage={`url(${BgImg})`}
      zIndex="-1"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="50%"
    >
      <Box pos="relative" w="full" m="auto" py="3rem">
        <Container
          display="flex"
          centerContent
          m="auto"
          maxW="7xl"
          textColor="white"
          paddingBottom="2rem"
        >
          <Flex direction="column" mx="auto">
            {/* MAIN HEADER */}
            <Heading
              as="h1"
              display="inline"
              fontSize="6xl"
              textAlign="center"
              mb="1rem"
            >
              Find Nearby <span style={{ color: 'red' }}>FoodTrucks</span>
            </Heading>
            {/* SUB HEADER */}
            <Heading
              as="h4"
              fontSize="xl"
              fontWeight="500"
              textAlign="center"
              my=".5rem"
            >
              Find some of the best joints from around the city from our
              partners and friends.
            </Heading>
            <Flex
              direction="row"
              mt="2rem"
              w="full"
              bg="white"
              border="2px"
              borderColor="gray.400"
              alignItems="stretch"
              rounded="4px"
              p="6px"
              shadow="lg"
            >
              <Flex
                as="form"
                direction="row"
                justifyItems="center"
                alignItems="center"
                w="full"
              >
                <FormControl isInvalid={errors.Search} w="80%">
                  <FormLabel htmlFor="Search" display="none">
                    Search bar:
                  </FormLabel>
                  <Input
                    bg="white"
                    textColor="black"
                    w="full"
                    name="Search"
                    border="none"
                    focusBorderColor="transparent"
                    fontSize="1.125rem"
                    placeholder="What are you in the mood for?"
                    ref={register()}
                  />
                  <FormErrorMessage>
                    {errors.Search && errors.Search.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  w="20%"
                  colorScheme="red"
                  fontSize="1.25rem"
                  fontWeight="400"
                  size="lg"
                >
                  Search
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
