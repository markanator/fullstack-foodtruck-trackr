import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import UserProvider from "./UserContext";
import { queryClient } from "~/lib/react-query";
import { AuthLoader } from "~/lib/auth";

const ErrorFallback = () => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        mt={4}
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </Flex>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

const Loader = () => {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  );
};
const Page403 = () => (
  <>
    <Container maxW="5xl" py="4rem">
      <Heading as="h1">Error 403!</Heading>
      <Heading as="h3" fontSize="xl">
        Thou shalt not pass!
      </Heading>
    </Container>
  </>
);

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <ChakraProvider resetCSS>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              {/* <Notifications /> */}
                <Router>
                  <UserProvider>{children}</UserProvider>
                </Router>
            </QueryClientProvider>
          </ChakraProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
