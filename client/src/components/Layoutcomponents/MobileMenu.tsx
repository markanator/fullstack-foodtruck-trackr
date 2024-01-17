import { Menu } from 'lucide-react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function DrawerExample({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton colorScheme="red" aria-label="mobile menu" icon={<Menu />} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Food Truck Trackr</DrawerHeader>

            <DrawerBody>
              <VStack spacing={4} align="stretch">
                {children}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
