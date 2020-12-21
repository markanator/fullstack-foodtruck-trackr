import { Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { FaTag } from 'react-icons/fa';
import { Link as RLink } from 'react-router-dom';

export default function TruckTags() {
  return (
    <Flex direction="column">
      <Heading as="h3" my="2rem" className="needs__dash" pos="relative">
        Truck Tags
      </Heading>
      <List direction="row" wrap="wrap">
        <ListItem>
          <Link
            as={RLink}
            to="/#"
            border="1px solid #00000025"
            px=".5rem"
            py="2px"
            rounded="md"
            display="inline-flex"
            alignItems="center"
            textDecoration="none"
            _hover={{
              backgroundColor: 'red !important',
              color: 'white',
            }}
          >
            <FaTag style={{ marginRight: '.25rem' }} />
            TEST
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
