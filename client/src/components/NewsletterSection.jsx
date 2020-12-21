import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { MdMailOutline } from 'react-icons/md';

export default function NewsletterSection() {
  return (
    <Flex direction="column" py="4rem" bg="red.500">
      <Container maxW="5xl" mx="auto">
        {/* test */}
        <Flex
          direction="column"
          mx="auto"
          textAlign="center"
          alignItems="center"
        >
          <Box color="white">
            <Heading as="h2" mb="5px" fontSize="2.5rem">
              Get the Latest News
            </Heading>
            <Text mb="5px" fontSize="1.25rem">
              Stay up to date, stay connected.
            </Text>
          </Box>
          <Box maxW="66%" w="full" m="auto">
            {/* test */}
            <Flex
              p="0"
              borderRadius="50px"
              boxShadow="0px 0px 0px 9px rgba(255, 255, 255, 0.8)"
              pos="relative"
              my="2rem"
            >
              <Flex
                display="flex"
                w="100%"
                alignItems="center"
                bg="white"
                borderRadius="50px"
                boxShadow="lg"
                p="5px 10px"
              >
                {/* input */}
                <Box fontSize="1.125rem" p=".5rem .75rem" mb="0">
                  <MdMailOutline />
                </Box>
                <Input
                  type="text"
                  rounded="full"
                  border="none"
                  name="newsletter"
                  placeholder="Enter your email..."
                />
              </Flex>
              <Button
                colorScheme="red"
                pos="absolute"
                top="5px"
                right="5px"
                zIndex="22"
                rounded="full"
              >
                Subscribe
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}
