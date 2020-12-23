/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Axios from 'axios';
import React from 'react';
import {
  FaHamburger,
  FaHeartBroken,
  FaMapPin,
  FaPhone,
  FaStar,
  FaStarHalf,
  FaTrashAlt,
} from 'react-icons/fa';
import { Link as RLink } from 'react-router-dom';
// locals
import FoodTruckImg from '../../assets/foodTruck.jpg';
import { useOwnerDeleteTruck } from '../../RQ/mutations/useOwnerDeleteTruck';
import { useRemoveFavoriteMutation } from '../../RQ/mutations/useRemoveFavoriteMutation';

export default function FavListItem({ deets, user_role }) {
  const { mutate } = useRemoveFavoriteMutation();
  const handleRemoveFavorite = () => {
    console.log('not in the mood');
    // TODO more stuff
    mutate(deets.id);
  };
  return (
    <ListItem
      padding="1.25rem 1.875rem"
      borderBottom="1px solid #eaeaea"
      transition=".3s"
      pos="relative"
    >
      <Flex py=".125rem" pos="relative">
        {/* IMAGE */}
        <Flex flex="1" maxW="250px" pos="relative">
          <Link
            as={RLink}
            to={`/truck/${deets.id}`}
            w="100%"
            h="100%"
            display="inline-block"
            overflow="hidden"
            pos="relative"
            zIndex="10"
          >
            <Image
              src={deets.hero_image || FoodTruckImg}
              alt={deets.name}
              objectFit="cover"
              w="100%"
              h="200px"
              rounded=".5rem"
              boxShadow="lg"
            />
          </Link>
        </Flex>
        {/* DEETS */}
        <Flex flex="1" pl="1.25rem">
          <Box
            className="deets__inner"
            pos="relative"
            top=".5rem"
            verticalAlign="top"
          >
            <Link as={RLink} to={`/truck/${deets.id}`} display="inline-flex">
              <Heading
                as="h3"
                display="inherit"
                w="auto"
                fontSize="1.25rem"
                bottom="2px"
                pos="relative"
                fontWeight="600"
                m="0"
                lineHeight="1.5rem"
              >
                {deets.name}
              </Heading>
            </Link>
            {/* TYPE */}
            <Flex
              direction="row"
              alignItems="center"
              m=".125rem"
              verticalAlign="sub"
              textColor="gray.500"
            >
              <FaHamburger style={{ marginRight: '.5rem' }} />
              {deets.cuisine_type}
            </Flex>
            {/* LOCATION */}
            <Flex
              direction="row"
              alignItems="center"
              m=".125rem"
              verticalAlign="sub"
              textColor="gray.500"
            >
              <FaMapPin style={{ marginRight: '.5rem' }} />
              {deets.address}
            </Flex>
            {/* Phone? */}
            <Flex
              direction="row"
              alignItems="center"
              m=".125rem"
              verticalAlign="sub"
              color="#808080"
            >
              <FaPhone style={{ marginRight: '.5rem' }} />
              {deets.phone}
            </Flex>
            {/* REVIEWS */}
            <Flex
              direction="row"
              alignItems="center"
              mt=".25rem"
              verticalAlign="sub"
              color="yellow.400"
            >
              {/* <FaStar />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStarHalf style={{ marginLeft: '.5rem' }} /> */}
              <Text color="gray.600" mr=".5rem">
                Rating:{' '}
              </Text>
              <Box
                px="5px"
                py="2px"
                background={deets.averageRating > 3 ? '#54ba1d' : '#e9e9e9'}
                rounded="md"
                verticalAlign="middle"
                fontSize=".875rem"
                fontWeight="600"
                textColor="white"
              >
                ({deets.averageRating || 0})
              </Box>
            </Flex>
            {/* SHORT DESCRIPTION */}
            <Text
              mt="5px"
              fontSize="1rem"
              lineHeight="1.25rem"
              textColor="gray.500"
            >
              {deets.description.slice(0, 144)}
            </Text>
          </Box>
        </Flex>

        <Flex direction="column" alignItems="center" m="auto" pl="1rem">
          {user_role === 'operator' ? (
            <>
              <Button
                as={RLink}
                to={`/truck/${deets.id}?addItem=true`}
                colorScheme="teal"
                w="full"
                mb="1rem"
              >
                Add Menu Items
              </Button>
              <Button
                as={RLink}
                to={`/edit-truck/${deets.id}`}
                colorScheme="blue"
                w="full"
                mb="1rem"
              >
                Edit Truck
              </Button>
              <DeleteTruckModal truck={deets} />
            </>
          ) : user_role === 'diner' ? (
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              w="full"
              mb="1rem"
              leftIcon={<FaHeartBroken />}
              onClick={handleRemoveFavorite}
            >
              Remove Favorite
            </Button>
          ) : null}
        </Flex>
      </Flex>
      {/* <Box>edit deets</Box> */}
    </ListItem>
  );
}

function DeleteTruckModal({ truck }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useOwnerDeleteTruck();

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" variant="outline" w="full">
        Delete Truck
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete Truck</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete <strong>{truck.name}</strong>?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              rightIcon={<FaTrashAlt />}
              onClick={() => {
                mutate(truck.id, {
                  onSuccess: () => onClose(),
                });
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
