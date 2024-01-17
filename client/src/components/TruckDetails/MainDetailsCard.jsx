/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';

export default function MainDetailsCard({ truck }) {
  // const test = search;
  const [isFavorite, setIsFavorite] = React.useState(false);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');

  // console.log('user deets', user);
  const handleFavorite = () => {
    axiosWithAuth()
      .post(`/trucks/favorites/${truck.id}`)
      .then(() => {
        if (user) {
          queryClient.setQueryData('user', {
            ...user,
            favoriteTrucks: [...user.favoriteTrucks, truck],
          });
        }
        setIsFavorite((old) => !old);
      })
      .catch((err) => {
        if (err?.response?.data.error.includes('already')) {
          if (user) {
            queryClient.setQueryData('user', {
              ...user,
              favoriteTrucks: [...user.favoriteTrucks, truck],
            });
            setIsFavorite((old) => !old);
          }
        }
        console.log(err.response);
      });
  };

  return (
    <Flex
      id="title__bar"
      direction="column"
      border="1px solid #00000225"
      backgroundColor="gray.100"
      rounded="lg"
      padding="1.125rem"
      mb="1.25rem"
      boxShadow="md"
    >
      {/* TITLE and CATEGORY */}
      <Heading
        as="h2"
        mb="5px"
        display="flex"
        alignItems="center"
        pos="relative"
        // className="needs__dash"
      >
        {truck.name}
        <Badge
          className="tag"
          textTransform="uppercase"
          ml="1rem"
          mt=".5rem"
          fontSize="sm"
          fontWeight="400"
          letterSpacing=".0125rem"
          px="10px"
          py="5px"
          colorScheme="red"
          variant="solid"
          rounded="4px"
          color="white"
        >
          {truck.cuisine_type}
        </Badge>
      </Heading>
      {/* LOCATION */}
      <Box fontSize="1rem" m="2px 0" mb="5px" fontWeight="400" display="block" color="gray.700">
        <FaMapPin
          style={{
            display: 'inline-block',
            fontSize: '1rem',
            color: 'red',
            marginRight: '.5rem',
            width: '18px',
            fontWeight: '600',
            textAlign: 'center',
            verticalAlign: 'sub',
          }}
        />
        {truck.address || 'No Address Listed.'}
      </Box>
      {/* PHONE */}
      <Box fontSize="1rem" m="2px 0" mb="5px" fontWeight="400" display="block" color="gray.700">
        <FaPhoneAlt
          style={{
            display: 'inline-block',
            fontSize: '1rem',
            color: 'red',
            marginRight: '.5rem',
            width: '18px',
            fontWeight: '600',
            textAlign: 'center',
            verticalAlign: 'sub',
          }}
        />
        {truck.phone}
      </Box>
      {/* RATINGS */}
      <Box mb="5px">
        Rating:
        <Badge
          top="0px"
          pos="relative"
          color="white"
          padding="1px 5px"
          display="inline-block"
          fontSize=".875rem"
          ml="6px"
          background={truck.averageRating >= 3 ? '#54ba1d' : '#e9e9e9'}
          fontWeight="600"
          lineHeight="1.25rem"
          rounded="4px"
          verticalAlign="middle"
        >
          ({truck.averageRating || 0})
        </Badge>
      </Box>
      {/* TRUCK INTERACTIONS */}
      <Flex direction="row" pt=".5rem" alignItems="center">
        {user && user?.user_role === 'diner' ? (
          <>
            <Button
              leftIcon={<FaHeart />}
              colorScheme="red"
              mr=".5rem"
              onClick={handleFavorite}
              disabled={isFavorite}
            >
              Favorite
            </Button>
            <RatingsMenu truckID={truck.id} />
          </>
        ) : user?.user_role === 'operator' ? (
          <Text fontStyle="italic">Truck Owners cannot Favorite or Rate Trucks.</Text>
        ) : (
          <Text>Sign in or Sign Up to rate and Favorite.</Text>
        )}
      </Flex>
    </Flex>
  );
}

function RatingsMenu({ truckID }) {
  const [success, setSuccess] = React.useState('');
  const handleRating = (e) => {
    // TODO:: more stuff
    // console.log('button tests', e.currentTarget.value);
    const rating = e.currentTarget.value;
    axiosWithAuth()
      .post(`/trucks/ratings/${truckID}`, { rating })
      .then(({ data }) => {
        // console.log('yay!', data);
        setSuccess(data.message);
      })
      .catch((err) => {
        console.log(err.response);
        setSuccess('Oops, an error occured...');
      });
  };

  return (
    <>
      <Menu>
        <MenuButton
          mr=".5rem"
          as={Button}
          leftIcon={<FaStar />}
          rightIcon={<FaChevronDown />}
          colorScheme="yellow"
        >
          Rating
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem value={1} onClick={handleRating}>
              1 ⭐
            </MenuItem>
            <MenuItem value={2} onClick={handleRating}>
              2 ⭐
            </MenuItem>
            <MenuItem value={3} onClick={handleRating}>
              3 ⭐
            </MenuItem>
            <MenuItem value={4} onClick={handleRating}>
              4 ⭐
            </MenuItem>
            <MenuItem value={5} onClick={handleRating}>
              5 ⭐
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <Text fontWeight="600">{success}</Text>
    </>
  );
}
