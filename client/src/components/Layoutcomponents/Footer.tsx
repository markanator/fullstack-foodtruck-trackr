import { Container, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => (
  <Flex
    as="footer"
    w="full"
    bg="#191f2b"
    color="rgba(245,255,255,.7)"
    borderTop="1px solid rgba(246,255,255,.07)"
  >
    <Container py="2rem" maxW="3xl">
      <Text textAlign="center" fontFamily={['.875rem', '1rem', '1.5rem']}>
        Copyright &copy; 2020 - {new Date().getFullYear()} Food Truck Trackr. Made with{' '}
        <span
          role="textbox"
          // alt="love"
          style={{
            color: 'white',
          }}
        >
          💪
        </span>
        by:{' '}
        <Link href="https://markambrocio.com" isExternal>
          {' '}
          Mark Ambrocio
        </Link>{' '}
        - All Rights Reserved.
      </Text>
    </Container>
  </Flex>
);

export default Footer;
