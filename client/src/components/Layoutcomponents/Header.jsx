/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaPizzaSlice, FaTruck } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { Link as RLink, useHistory } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';
import LoginBtnModal from './LoginBtnModal';
import SignUpBtnModal from './SignUpBtnModal';

export default function Header() {
  const router = useHistory();
  let RightSide;
  // const { userState } = useUserContext();
  const queryClient = useQueryClient();

  const queryUser = queryClient.getQueryData('user');

  // console.log('header user data', queryUser);

  if (queryUser?.username && isLoggedIn()) {
    RightSide = (
      <>
        {queryUser?.user_role === 'diner' ? (
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
              title={`Sign in as: ${queryUser?.username}`}
              zIndex={999}
            >
              <MenuItem
                as={RLink}
                to={`/dashboard/${queryUser?.username}`}
                zIndex={999}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                as={RLink}
                to={`/dashboard/${queryUser?.username}/settings`}
                zIndex={999}
              >
                Settings
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem
              zIndex={999}
              onClick={() => {
                console.log('LogOut...');
                queryClient.invalidateQueries('user');
                window.localStorage.removeItem('token');
                router.push('/');
              }}
            >
              Logout
            </MenuItem>
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
              <Text
                fontSize={['1rem', '1.25rem', '1.5rem']}
                fontWeight="700"
                color="#ff0129"
              >
                Food Truck Tracker
              </Text>
            </Link>
          </Box>
          <Box w="50%" textAlign="right" zIndex={10}>
            <Flex
              justifyContent="flex-end"
              direction="row"
              alignItems="center"
              display={['none', 'none', 'flex']}
            >
              {RightSide}
            </Flex>
          </Box>
        </Center>
      </Container>
    </Flex>
  );
}
