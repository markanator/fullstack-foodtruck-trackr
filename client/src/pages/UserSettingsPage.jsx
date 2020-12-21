import { Container, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import DEFIMG from '../assets/random_street.jpg';

export default function UserSettingsPage() {
  return (
    <Layout>
      <Flex direction="column" pos="relative" bg="gray.100">
        {/* PAGE TITLE */}
        <Flex
          className="page__title"
          flexDirection="column"
          flexWrap="wrap"
          pos="relative"
          w="full"
          h="200px"
          background="#f4f5f7"
          textAlign="left"
          justifyContent="center"
          alignItems="center"
          bgRepeat="no-repeat"
          backgroundImage={`url('${DEFIMG}')`}
          backgroundSize="cover !important"
          backgroundPosition="center"
        >
          {/* test */}
          <Container m="auto" maxW="6xl" zIndex="1" color="white">
            <Heading as="h2" mb="1rem">
              Dashboard
            </Heading>
          </Container>
        </Flex>
        <Container maxW="5xl" py="4rem">
          {/* test */}
        </Container>
      </Flex>
    </Layout>
  );
}
