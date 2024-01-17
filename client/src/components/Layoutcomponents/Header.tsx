import { Pizza, Truck } from 'lucide-react';
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
import { Link as RLink, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useUser } from '~/features/auth/auth.hooks';

export default function Header() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const isOperator = user?.roles.some((role) => role.name === 'operator');

  return (
    <Flex as="header" w="full" py=".5rem" boxShadow="md" zIndex={10}>
      <Container m="auto" w="full" maxW="7xl">
        <Center flexDirection="row" w="full">
          <Box w="50%">
            <Link as={RLink} to="/" textDecoration="none" color="#ff0129">
              {/* <img src={logo} alt="site" height={38} width={142} /> */}
              <Text fontSize={['1rem', '1.25rem', '1.5rem']} fontWeight="700" color="#ff0129">
                Food Truck Tracker
              </Text>
            </Link>
          </Box>
          <Box w="50%" textAlign="right" zIndex={10}>
            <Flex
              justifyContent="flex-end"
              direction="row"
              alignItems="center"
              display={['flex', 'flex', 'none']}
            >
              {/* <DrawerExample>{RightSide}</DrawerExample> */}
            </Flex>
            <Flex
              justifyContent="flex-end"
              direction="row"
              alignItems="center"
              display={['none', 'none', 'flex']}
            >
              <SignedIn>
                <>
                  {!isOperator ? (
                    <Button
                      as={RLink}
                      to="/trucks"
                      mr={['0', '0', '1rem']}
                      colorScheme="red"
                      rightIcon={<Pizza />}
                      size="lg"
                    >
                      Find Food
                    </Button>
                  ) : (
                    <Button
                      as={RLink}
                      to="/trucks/new"
                      mr={['0', '0', '1rem']}
                      colorScheme="red"
                      rightIcon={<Truck />}
                      size="lg"
                    >
                      Add Listing
                    </Button>
                  )}
                  <Menu>
                    <MenuButton as={Button} colorScheme="red" size="lg">
                      Dashboard
                    </MenuButton>
                    <MenuList zIndex={999}>
                      <MenuGroup
                        textAlign="left"
                        title={`Sign in as: ${user?.username}`}
                        zIndex={999}
                      >
                        <MenuItem as={RLink} to={`/dashboard/${user?.username}`} zIndex={999}>
                          Dashboard
                        </MenuItem>
                        <MenuItem
                          as={RLink}
                          to={`/dashboard/${user?.username}/settings`}
                          zIndex={999}
                        >
                          Settings
                        </MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuItem
                        zIndex={999}
                        // onClick={async () => {
                        //   await logout({});
                        //   navigate('/');
                        // }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              </SignedIn>
              <SignedOut>
                <Button
                  as={RLink}
                  to="/trucks"
                  mr={['0', '0', '1rem']}
                  colorScheme="red"
                  size="lg"
                  rightIcon={<Pizza />}
                >
                  Find Food
                </Button>
                <Link href="/auth/sign-in">
                  <Button
                    id="loginModal"
                    colorScheme="red"
                    variant="outline"
                    size="lg"
                    mr={['0', '0', '1rem']}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button id="loginModal" colorScheme="red" size="lg" mr={['0', '0', '1rem']}>
                    Sign Up
                  </Button>
                </Link>
              </SignedOut>
            </Flex>
          </Box>
        </Center>
      </Container>
    </Flex>
  );
}
