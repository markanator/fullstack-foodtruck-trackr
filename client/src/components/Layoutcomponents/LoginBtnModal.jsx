/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
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
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { LoginSchema } from '../../Forms/Schemas/LoginSchema';
import { useLoginMutation } from '../../RQ/mutations/useLoginMutation';

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
        mr={['0', '0', '1rem']}
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

export default LoginBtnModal;
