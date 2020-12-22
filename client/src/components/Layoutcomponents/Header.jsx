/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  FormErrorMessage,
} from '@chakra-ui/react';
import Axios from 'axios';
import React from 'react';
import { FaPizzaSlice, FaTruck } from 'react-icons/fa';
import { Link as RLink, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useQueryClient } from 'react-query';
import { useUserContext } from '../../context/UserContext';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { LoginSchema } from '../../Forms/Schemas/LoginSchema';
import { SignUpSchema } from '../../Forms/Schemas/SignUpSchema';
import { useLoginMutation } from '../../RQ/mutations/useLoginMutation';

export default function Header() {
  let RightSide;
  const { userState } = useUserContext();

  if (userState.isLoggedIn && isLoggedIn()) {
    RightSide = (
      <>
        {userState.user_role === 'diner' ? (
          <Button
            as={RLink}
            to="/search-trucks"
            mr="1rem"
            colorScheme="red"
            rightIcon={<FaPizzaSlice />}
            size="lg"
          >
            Find Food
          </Button>
        ) : (
          <Button
            as={RLink}
            to="/add-truck"
            mr="1rem"
            colorScheme="red"
            rightIcon={<FaTruck />}
            size="lg"
          >
            Add Listing
          </Button>
        )}
        <Menu zIndex={999}>
          <MenuButton as={Button} colorScheme="red" size="lg">
            Dashboard
          </MenuButton>
          <MenuList zIndex={999}>
            <MenuGroup
              textAlign="left"
              title={`Sign in as: ${userState.userInfo.username}`}
              zIndex={999}
            >
              <MenuItem
                as={RLink}
                to={`/dashboard/${userState.userInfo.username}`}
                zIndex={999}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                as={RLink}
                to={`/dashboard/${userState.userInfo.username}/settings`}
                zIndex={999}
              >
                Settings
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem zIndex={999}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else {
    RightSide = (
      <>
        <Button
          rightIcon={<FaPizzaSlice />}
          as={RLink}
          to="/search-trucks"
          mr=".5rem"
          colorScheme="red"
          size="lg"
        >
          Find Food
        </Button>
        <LoginBtnModal />
        <SignUpBtnModal />
      </>
    );
  }

  return (
    <Flex as="header" w="full" py=".5rem" boxShadow="md" zIndex={10}>
      <Container m="auto" w="full" maxW="7xl">
        <Center direction="row" w="full">
          <Box w="50%">
            <Link as={RLink} to="/" textDecoration="none" color="#ff0129">
              {/* <img src={logo} alt="site" height={38} width={142} /> */}
              <Text fontSize="1.5rem" fontWeight="700" color="#ff0129">
                Food Truck Tracker
              </Text>
            </Link>
          </Box>
          <Box w="50%" textAlign="right" zIndex={10}>
            {RightSide}
          </Box>
        </Center>
      </Container>
    </Flex>
  );
}

const LoginBtnModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useHistory();
  const { setUserState } = useUserContext();
  const queryClient = useQueryClient();

  const { mutate } = useLoginMutation();

  function onSubmit(values) {
    mutate(values, {
      onError: (error) => {
        console.log(error.response);
      },
      onSuccess: ({ data }) => {
        window.localStorage.setItem('token', data.token);
        setUserState({
          isLoggedIn: true,
          userInfo: {
            ...data.user,
          },
          token: data.token,
        });
        queryClient.setQueryData('user', data.user);
        // push them
        router.push(`/dashboard/${data.user.username}`);
      },
    });
  }

  return (
    <>
      <Button
        id="loginModal"
        colorScheme="red"
        size="lg"
        margin={2}
        onClick={onOpen}
      >
        Login
      </Button>
      <Modal id="loginModal" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <ModalBody>
                  {/* EMAIL */}
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          id="email"
                          placeholder="email@example.com"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* PASSWORD */}
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="red"
                    // disabled={formState.isSubmitting}
                  >
                    Login
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

const SignUpBtnModal = () => {
  const router = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUserState } = useUserContext();

  const onSubmit = (values) => {
    Axios.post(`${process.env.REACT_APP_HOSTED_BACKEND}/user`, {
      ...values,
    })
      .then(({ data }) => {
        // console.log('signup data:', data);
        // set localstorage token
        window.localStorage.setItem('token', data.token);
        setUserState({
          isLoggedIn: true,
          userInfo: {
            ...data.user,
          },
          token: data.token,
        });
        // push user
        router.push(`/dashboard/${data.user.username}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button
        colorScheme="red"
        size="lg"
        textDecoration="none"
        onClick={onOpen}
      >
        Sign Up
      </Button>
      <Modal id="signUpModal" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              user_role: '',
              username: '',
              email: '',
              password: '',
              first_name: '',
              last_name: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <ModalBody>
                  {/* ACCOUNT TYPE */}
                  <Field name="user_role">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        mb=".5rem"
                        isInvalid={
                          form.errors.user_role && form.touched.user_role
                        }
                      >
                        <FormLabel htmlFor="user_role">Account Type</FormLabel>
                        <RadioGroup
                          {...field}
                          // name="user_role"
                          aria-labelledby="accout-type"
                        >
                          <Stack direction="row">
                            <Radio
                              {...field}
                              id="user_diner"
                              name="user_role"
                              type="radio"
                              value="diner"
                            >
                              Diner
                            </Radio>
                            <Radio
                              {...field}
                              id="user_operator"
                              name="user_role"
                              type="radio"
                              value="operator"
                            >
                              Operator
                            </Radio>
                          </Stack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {form.errors.user_role}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* FULL NAME */}
                  <Flex direction="row">
                    <Field name="first_name">
                      {/* FIRST NAME */}
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.first_name && form.touched.first_name
                          }
                          mr=".5rem"
                        >
                          <FormLabel htmlFor="first_name">First name</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="Gabi"
                          />
                          <FormErrorMessage>
                            {form.errors.first_name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* lastName */}
                    <Field name="last_name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.last_name && form.touched.last_name
                          }
                          ml=".5rem"
                        >
                          <FormLabel htmlFor="last_name">Last name</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Gabi"
                          />
                          <FormErrorMessage>
                            {form.errors.last_name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  {/* USERNAME */}
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                          {...field}
                          type="text"
                          name="username"
                          id="username"
                          placeholder="username"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* EMAIL */}
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          id="email"
                          name="email"
                          placeholder="email@example.com"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* PASSWORD */}
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="reset"
                    colorScheme="gray"
                    mr={3}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button type="submit" colorScheme="red">
                    Login
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
