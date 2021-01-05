/* eslint-disable react/prop-types */
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
// import { numberWithCommas } from '../../utils/IntWithComas';

export default function DashStatCard({ color, number, text, Icon }) {
  return (
    <Box flex={['1', '1', '0 0 25%']} px="1rem" w="full">
      <Box
        background="linear-gradient( to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.1) )"
        backgroundColor={color}
        display="inline-block"
        p="0"
        height="160px"
        color="#fff"
        borderRadius="4px"
        w="full"
        pos="relative"
        mb="1.125rem"
        overflow="hidden"
      >
        {/* DIGITIS */}
        <Box pos="absolute" left="2rem" top="50%" transform="translateY(-50%)">
          <Heading as="h4" fontSize="2.25rem" fontWeight="600">
            {number && number.toLocaleString()}
          </Heading>
          <Text fontSize="1.125rem" mt="4px" fontWeight="300">
            {text}
          </Text>
        </Box>
        {/* ICON */}
        <Box
          pos="absolute"
          right="25px"
          top="50%"
          transform="translateY(-40%)"
          opacity="0.2"
          fontSize="4rem"
        >
          <Icon />
        </Box>
        <Box />
      </Box>
    </Box>
  );
}
