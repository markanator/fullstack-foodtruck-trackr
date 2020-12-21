/* eslint-disable react/prop-types */
import { Badge, Box, Heading, Image, ListItem, Text } from '@chakra-ui/react';
import React from 'react';

export default function MenuItem({ menuItem }) {
  return (
    <ListItem
      className="menuitem__item"
      padding="1rem 1.25rem"
      border="1px solid #00000015"
      pos="relative"
      display="flex"
      flexDirection="row"
    >
      <Box w={1 / 5}>
        <Image
          src={menuItem.item_photo}
          alt={menuItem.item_name}
          h="50px"
          w="50px"
          objectFit="cover"
          rounded="full"
          mr="1rem"
        />
      </Box>
      <Box w={3 / 5} display="flex" flexDirection="column">
        <Heading as="h5" fontSize="1.25rem">
          {menuItem.item_name}
        </Heading>
        <Text>{menuItem.item_description}</Text>
      </Box>
      <Box
        w={1 / 5}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Badge fontSize="lg" variant="solid" colorScheme="gray">
          ${menuItem.item_price}
        </Badge>
      </Box>
    </ListItem>
  );
}
