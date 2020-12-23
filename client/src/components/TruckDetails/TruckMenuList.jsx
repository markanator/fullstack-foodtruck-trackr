/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import MenuItem from './MenuItem';
import { useURLQuery } from '../../utils/useURLQuery';
import { CreateMenuItemSchema } from '../../Forms/Schemas/CreateMenuItemSchema';
import { useAddMenuItem } from '../../RQ/mutations/useAddMenuItem';

export default function TruckMenuList({ list, user, truckID }) {
  const search = useURLQuery();
  const isAddingItem = search.get('addItem') === 'true';

  console.log('userAdding Item', isAddingItem, truckID);

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
          <Flex
            // display="block"
            pos="relative"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            zIndex="10"
            width="full"
            color="white"
            backgroundColor="#ff2222"
            p="1.125rem"
            borderRadius="4px 4px 0 0"
            borderBottom="1px solid #ff2222"
            m="0"
          >
            <Heading fontSize="1.25rem" fontWeight="600">
              Current Items
            </Heading>
            {isAddingItem && user?.user_role === 'operator' ? (
              <AddItem truckID={truckID} />
            ) : null}
          </Flex>
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

function AddItem({ truckID }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuImage, setMenuImage] = React.useState(null);
  const { mutate } = useAddMenuItem(truckID);

  const uploadFile = async (e) => {
    console.log('uploading...');
    const { files } = e.target;
    if (!files[0]) {
      return;
    }
    if (files[0].size > 1048576) {
      alert('Image size larger than 1MB.');
      console.log('file too big, not uploaded');
      return;
    }

    const imgData = new FormData();
    imgData.append('file', files[0]);
    imgData.append('upload_preset', 'foodtrucks');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dmh43eiaf/image/upload',
      {
        method: 'POST',
        body: imgData,
      }
    );
    const file = await res.json();
    console.log('uploaded file:::');
    setMenuImage(file.secure_url);
  };

  const onSubmit = (values) => {
    const menuItem = {
      ...values,
      item_photo: menuImage,
    };

    console.log('final menuItem...', menuItem);
    mutate(menuItem, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add Menu Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Menu Item Form</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              item_name: '',
              item_description: '',
              item_price: '',
            }}
            validationSchema={CreateMenuItemSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <ModalBody>
                  {/* item_name */}
                  <Field name="item_name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.item_name && form.touched.item_name
                        }
                      >
                        <FormLabel htmlFor="item_name">Name</FormLabel>
                        <Input
                          {...field}
                          type="text"
                          id="item_name"
                          name="item_name"
                          placeholder="The Great Burger"
                        />
                        <FormErrorMessage>
                          {form.errors.item_name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* item_description */}
                  <Field name="item_description">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.item_description &&
                          form.touched.item_description
                        }
                      >
                        <FormLabel htmlFor="item_description">
                          Description
                        </FormLabel>
                        <Input
                          {...field}
                          type="text"
                          id="item_description"
                          name="item_description"
                          placeholder="The Great Burger"
                        />
                        <FormErrorMessage>
                          {form.errors.item_description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* item_photo */}
                  <FormControl isInvalid={menuImage === null}>
                    <FormLabel htmlFor="item_photo">Photo</FormLabel>
                    <Input
                      type="file"
                      id="item_photo"
                      name="item_photo"
                      accept="image/*"
                      whiteSpace="nowrap"
                      overflowX="hidden"
                      pt=".25rem"
                      placeholder="File size under 1MB."
                      onChange={uploadFile}
                    />
                    <FormErrorMessage>
                      {menuImage === null ? 'Required!' : 'Image uploaded!'}
                    </FormErrorMessage>
                  </FormControl>

                  {/* item_price */}
                  <Field name="item_price">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.item_price && form.touched.item_price
                        }
                      >
                        <FormLabel htmlFor="item_price">Price</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          id="item_price"
                          name="item_price"
                          placeholder="$4"
                          min="1"
                          step="any"
                        />
                        <FormErrorMessage>
                          {form.errors.item_price}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="green" type="submit">
                    Add Item
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
