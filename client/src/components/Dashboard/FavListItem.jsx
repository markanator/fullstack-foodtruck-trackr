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
  FaMapPin,
  FaStar,
  FaStarHalf,
  FaTrashAlt,
} from 'react-icons/fa';
import { Link as RLink } from 'react-router-dom';
// locals
import FoodTruckImg from '../../assets/foodTruck.jpg';
import { useOwnerDeleteTruck } from '../../RQ/mutations/useOwnerDeleteTruck';

export default function FavListItem({ deets }) {
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
              h="150px"
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
            {/* Phone?
            <Flex
              direction="row"
              alignItems="center"
              m=".125rem"
              verticalAlign="sub"
              color="#808080"
            >
              <FaPhone style={{ marginRight: '.5rem' }} />
              Phone
            </Flex> */}
            {/* REVIEWS */}
            <Flex
              direction="row"
              alignItems="center"
              mt=".25rem"
              verticalAlign="sub"
              color="yellow.400"
            >
              <FaStar />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStar style={{ marginLeft: '.5rem' }} />
              <FaStarHalf style={{ marginLeft: '.5rem' }} />
              <Box
                px="5px"
                py="2px"
                background="#54ba1d"
                rounded="md"
                verticalAlign="middle"
                fontSize=".875rem"
                fontWeight="600"
                textColor="white"
              >
                (4.5)
              </Box>
            </Flex>
            {/* SHORT DESCRIPTION */}
            <Text
              mt="5px"
              fontSize="1rem"
              lineHeight="1.25rem"
              textColor="gray.500"
            >
              {deets.description}
            </Text>
          </Box>
        </Flex>

        <Flex direction="column" alignItems="center" m="auto">
          <Button
            as={RLink}
            to={`/edit-truck/${deets.id}`}
            colorScheme="blue"
            w="full"
            mb="1rem"
          >
            Edit
          </Button>
          <DeleteTruckModal truck={deets} />
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
      <Button onClick={onOpen} colorScheme="red">
        Open Modal
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
