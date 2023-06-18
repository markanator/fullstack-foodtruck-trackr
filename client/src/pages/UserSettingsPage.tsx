/* eslint-disable react/prop-types */
import {
  Button,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
// locals
import { useNavigate } from "react-router-dom";
import DEFIMG from "../assets/random_street.jpg";
import Layout from "../components/Layout";
import { useDeleteAccountMutation } from "../RQ/mutations/useDeleteAccountMutation";
import { useGetSelfQuery } from "../RQ/query/useGetSelfQuery";

export default function UserSettingsPage() {
  const { data, isLoading, isError, error } = useGetSelfQuery();

  if (isLoading) {
    return (
      <Layout>
        <Container maxW="5xl" py="4rem">
          <Text>Loading...</Text>
        </Container>
      </Layout>
    );
  }
  if (isError) {
    return (
      <Layout>
        <Container maxW="5xl" py="4rem">
          <Heading>Error</Heading>
          <Text>{error?.response?.message}</Text>
        </Container>
      </Layout>
    );
  }

  // console.log('user data on settings page::', data);
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
          <Container m="auto" maxW="6xl" zIndex="1" color="white">
            <Heading as="h2" mb="1rem">
              Settings
            </Heading>
          </Container>
        </Flex>
        <Container maxW="5xl" py="4rem">
          {/* test */}
          <Flex>
            <Flex
              direction={["column", "row"]}
              alignItems="center"
              w="full"
              // justifyContent="space-evenly"
            >
              <Heading as="h4" fontSize="1.25rem" mr="1rem">
                Delete Account:
              </Heading>
              <DeleteModal userId={data.id} />
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}

function DeleteModal({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useDeleteAccountMutation();

  const handleAccountDelete = () => {
    console.log("aaaaand its gone...");
    mutate(undefined, {
      onSuccess: () => {
        window.localStorage.removeItem("token");
        navigate("/");
        onClose();
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" variant="outline">
        DELETE ACCOUNT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cofirm Account Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You cannot undo this action!</ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleAccountDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
