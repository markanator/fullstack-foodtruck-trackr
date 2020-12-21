/* eslint-disable react/prop-types */
import { Box, Flex, Heading, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import MenuItem from './MenuItem';

export default function TruckMenuList({ list }) {
  return (
    <Flex direction="column">
      <Heading as="h3" my="2rem" className="needs__dash" pos="relative">
        Truck Menu
      </Heading>
      <Box
        id="menuitems__main"
        overflow="hidden"
        pos="relative"
        transition="all 0.4s"
      >
        <Flex
          id="menuitems__prices"
          direction="column"
          border="1px solid #00000015"
          rounded="lg"
        >
          <Heading
            display="block"
            pos="relative"
            zIndex="10"
            width="full"
            color="white"
            backgroundColor="#ff2222"
            p="1.125rem"
            borderRadius="4px 4px 0 0"
            borderBottom="1px solid #ff2222"
            fontSize="1.25rem"
            fontWeight="600"
            m="0"
          >
            Current Items
          </Heading>
          <List mb="0" background="#f9f9f9">
            {/* sort through menuitems later */}
            {list && list.length > 0 ? (
              list.map((item) => (
                <MenuItem key={item.item_name} menuItem={item} />
              ))
            ) : (
              <ListItem
                className="menuitem__item"
                padding="1rem 1.25rem"
                border="1px solid #00000015"
                pos="relative"
                display="flex"
                flexDirection="row"
              >
                No Menu Items...
              </ListItem>
            )}
            {/* <MenuItem menuItem={truck} /> */}
            {/* // <MenuItem menuItem={truck} /> */}
          </List>
        </Flex>
      </Box>
    </Flex>
  );
}
