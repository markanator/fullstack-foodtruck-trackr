import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import UserProvider from "./providers/UserContext";
import CreateTruckForm from "./pages/CreateTruckForm";
import Dashboard from "./pages/Dashboard";
import EditTruck from "./pages/EditTruck";
import Home from "./pages/Home";
import ListingsPage from "./pages/ListingsPage";
import TruckDetails from "./pages/TruckDetails";
import UserSettingsPage from "./pages/UserSettingsPage";
import PrivateRoute from "./utils/PrivateRoute";
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import { AppProvider } from "./providers/AppProviders";

const queryClient = new QueryClient();

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const App = () => (
  <AppProvider>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Home />} />
        {/* TODO: private route */}
        <Route path="/dashboard">
          <Route path=":username" element={<Dashboard />} />
          <Route path=":username/settings" element={<UserSettingsPage />} />
        </Route>
        <Route path="/trucks" element={<Outlet />}>
          <Route index element={<ListingsPage />} />
          <Route path="new" element={<CreateTruckForm />} />
          <Route path=":id" element={<TruckDetails />} />
          <Route path=":id/edit" element={<EditTruck />} />
        </Route>
        <Route path="/403" element={<Page403 />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  </AppProvider>
);

const Page404 = () => (
  <>
    <Container maxW="5xl" py="4rem" minH="calc(100vh - 150px)">
      <Heading as="h1">Error 404!</Heading>
      <Heading as="h3" fontSize="xl">
        The page you requested could not be found!
      </Heading>
    </Container>
  </>
);

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

// default export
export default App;
