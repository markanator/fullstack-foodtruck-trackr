/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
  useDisclosure,
} from "@chakra-ui/react";
import Axios from "../../axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { SignUpSchema } from "../../Forms/Schemas/SignUpSchema";

const SignUpBtnModal = () => {
  const router = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUserState } = useUserContext();

  const onSubmit = (values) => {
    Axios.post("/users", {
      ...values,
    })
      .then(({ data }) => {
        // console.log('signup data:', data);
        // set localstorage token
        window.localStorage.setItem("token", data.token);
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
      <Button colorScheme="red" size="lg" textDecoration="none" onClick={onOpen}>
        Sign Up
      </Button>
      <Modal id="signUpModal" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              user_role: "",
              username: "",
              email: "",
              password: "",
              first_name: "",
              last_name: "",
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
                        isInvalid={form.errors.user_role && form.touched.user_role}
                      >
                        <FormLabel htmlFor="user_role">Account Type</FormLabel>
                        <RadioGroup
                          {...field}
                          // name="user_role"
                          aria-labelledby="accout-type"
                        >
                          <Stack direction="row">
                            <Radio {...field} id="user_diner" name="user_role" type="radio" value="diner">
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
                        <FormErrorMessage>{form.errors.user_role}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* FULL NAME */}
                  <Flex direction="row">
                    <Field name="first_name">
                      {/* FIRST NAME */}
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.first_name && form.touched.first_name} mr=".5rem">
                          <FormLabel htmlFor="first_name">First name</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="Gabi"
                          />
                          <FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* lastName */}
                    <Field name="last_name">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.last_name && form.touched.last_name} ml=".5rem">
                          <FormLabel htmlFor="last_name">Last name</FormLabel>
                          <Input {...field} type="text" name="last_name" id="last_name" placeholder="Gabi" />
                          <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  {/* USERNAME */}
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input {...field} type="text" name="username" id="username" placeholder="username" />
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* EMAIL */}
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
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
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          name="password"
                          placeholder="password"
                        />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button type="reset" colorScheme="gray" mr={3} onClick={onClose}>
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

export default SignUpBtnModal;
