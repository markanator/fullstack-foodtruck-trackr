import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Button, ChakraProvider, Spinner } from "@chakra-ui/react";
// import { AuthLoader } from "~/lib/auth";
import UserProvider from "./UserContext";
import { queryClient } from "~/lib/react-query";
import { AuthLoader } from "~/lib/auth";
// import { Notifications } from '~/components/Notifications/Notifications';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        mt={4}
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <ChakraProvider resetCSS>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              {/* <Notifications /> */}
              <AuthLoader renderLoading={Loader}>
                <Router>
                  <UserProvider>{children}</UserProvider>
                </Router>
              </AuthLoader>
            </QueryClientProvider>
          </ChakraProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
