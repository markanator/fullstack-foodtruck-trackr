/* eslint-disable react/prop-types */
import { Badge, Box, Flex, Heading, Image, Link } from '@chakra-ui/react';
import React from 'react';
import { FaEye, FaMapPin, FaPhoneAlt, FaRegHeart, FaTag } from 'react-icons/fa';
import { Link as RLink } from 'react-router-dom';
import DefaultTruckImage from '../../assets/default_truck.webp';

export function TruckListingCard({ info }) {
  return (
    <Box
      className="truck__listcard"
      pos="relative"
      float="left"
      w={1 / 3}
      px="1rem"
    >
      <Link
        as={RLink}
        to={`/truck/${info.id}`}
        _hover={{
          transform: 'translate3d(0, -10px, 0)',
        }}
        background="#f6f6f6"
        display="block"
        h="full"
        w="full"
        rounded="4px"
        mb="60px"
        boxShadow="lg"
        transform="translate3d(0, 0, 0);"
        transition="ease-in-out .3s"
      >
        <Box
          className="listing__img"
          display="block"
          pos="relative"
          overflow="hidden"
          background="#ccc"
          rounded="4px"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="50%"
          height="300px"
          zIndex="100"
          cursor="pointer"
        >
          {/* IMAGE */}
          <Image
            src={info.hero_image || DefaultTruckImage}
            alt={info.name}
            objectFit="cover"
            height="100%"
            w="100%"
            rounded="4px 4px 0 0"
            transition="all .55s"
            verticalAlign="middle"
            maxW="100%"
          />
          {/* CATEGORY */}
          <Badge
            className="tag"
            textTransform="uppercase"
            fontSize="md"
            fontWeight="600"
            letterSpacing=".5px"
            colorScheme="red"
            variant="solid"
            rounded="4px"
            padding="3px 6px"
            lineHeight="20px"
            color="white"
            mb=".5rem"
            pos="absolute"
            zIndex="999"
            top="20px"
            right="20px"
          >
            {info.cuisine_type}
          </Badge>
          {/* FEATURED */}
          {info.price_range === '$$' ? (
            <Badge
              className="feat__tag"
              colorScheme="teal"
              variant="solid"
              pos="absolute"
              top="60px"
              right="20px"
              zIndex="999"
              fontSize="md"
              fontWeight="600"
              color="white"
              lineHeight="1.25rem"
              textTransform="uppercase"
              letterSpacing=".5px"
              padding="3px 6px"
              rounded="4px"
              mb=".5rem"
            >
              Featured
            </Badge>
          ) : null}

          <Box
            pos="absolute"
            bottom="2.875rem"
            left="0"
            padding="0 20px"
            w="full"
            zIndex="50"
            boxSizing="border-box"
          >
            <Box mb=".5rem" display="block">
              {/* PRICE RANGE */}
              <Box
                display="inline-flex"
                alignItems="center"
                w="auto"
                padding="0 8px"
                background="rgba(255, 255, 255, 0.95)"
                color="#525252"
                fontSize="14px"
                fontWeight="600"
                mr="5px"
                rounded="4px"
                m="2px 0"
              >
                <FaTag
                  style={{
                    fontSize: '1rem',
                    color: 'red',
                    marginRight: '.5rem',
                    width: '16px',
                    verticalAlign: 'initial',
                  }}
                />
                {info.price_range}
              </Box>
            </Box>
            {/* TRUCK TITLE */}
            <Heading
              as="h3"
              color="white"
              fontSize="20px"
              bottom="2px"
              pos="relative"
              fontWeight="400"
              m="0"
              lineHeight="30px"
            >
              {info.name}
            </Heading>
            {/* LOCATION */}
            <Box
              fontSize="1rem"
              m="2px 0"
              fontWeight="400"
              display="block"
              color="rgba(255,255,255,.85)"
            >
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
              {info.description.slice(0, 15)}
            </Box>
            {/* PHONE */}
            <Box
              fontSize="1rem"
              m="2px 0"
              fontWeight="400"
              display="block"
              color="rgba(255,255,255,.85)"
            >
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
              (123) 456-7890
            </Box>
          </Box>
        </Box>

        <Box
          fontSize="1rem"
          display="block"
          m="0"
          zIndex="9999"
          pos="absolute"
          background="white"
          w="auto"
          bottom="-25px"
          rounded="4px"
          boxShadow="lg"
          padding="1rem .875rem"
          left="10px"
          right="10px"
        >
          <Badge
            top="0px"
            pos="relative"
            color="white"
            padding="1px 5px"
            display="inline-block"
            fontSize=".875rem"
            ml="6px"
            background={info.averageRating ? '#54ba1d' : '#e9e9e9'}
            fontWeight="600"
            lineHeight="1.25rem"
            rounded="4px"
            verticalAlign="middle"
          >
            ({info.averageRating || 0})
          </Badge>

          <Box
            pos="absolute"
            right="65px"
            fontWeight="600"
            color="#626262"
            fontSize=".875rem"
            bottom="15px"
          >
            <FaEye
              style={{
                display: 'inline-block',
                fontSize: '15px',
                color: 'rgba(0, 0, 0, 0.55)',
                marginRight: '3px',
                textAlign: 'center',
              }}
            />
            {info.id}+
          </Box>

          <Flex
            pos="absolute"
            zIndex="101"
            right="1rem"
            bottom="11px"
            backgroundColor="#f0f0f0"
            h="2.25rem"
            w="2.25rem"
            rounded="full"
            justifyContent="center"
            alignItems="center"
          >
            <FaRegHeart
              style={{
                color: 'red',
              }}
            />
          </Flex>
        </Box>
      </Link>
    </Box>
  );
}
