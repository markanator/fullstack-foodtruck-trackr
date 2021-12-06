/* eslint-disable no-use-before-define */
import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import UserProvider from './context/UserContext';
import CreateTruckForm from './pages/CreateTruckForm';
import Dashboard from './pages/Dashboard';
import EditTruck from './pages/EditTruck';
import Home from './pages/Home';
import ListingsPage from './pages/ListingsPage';
import TruckDetails from './pages/TruckDetails';
import UserSettingsPage from './pages/UserSettingsPage';
import PrivateRoute from './utils/PrivateRoute';
import {ChakraProvider, extendTheme, CSSReset} from "@chakra-ui/react"

const queryClient = new QueryClient();

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <PrivateRoute exact path="/dashboard/:username">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard/:username/settings">
                <UserSettingsPage />
              </PrivateRoute>
              <PrivateRoute path="/add-truck">
                <CreateTruckForm />
              </PrivateRoute>
              <PrivateRoute path="/edit-truck/:id">
                <EditTruck />
              </PrivateRoute>
              <Route path="/search-trucks">
                <ListingsPage />
              </Route>
              <Route path="/truck/:truckID">
                <TruckDetails />
              </Route>
              <Route path="/403" component={Page403} />
              <Route component={Page404} />
            </Switch>
          </Router>
        </UserProvider>
      </QueryClientProvider>
  </ChakraProvider>
);

const Page404 = () => (
  <Layout>
    <Container maxW="5xl" py="4rem">
      <Heading as="h1">Error 404!</Heading>
      <Heading as="h3" fontSize="xl">
        The page you requested could not be found!
      </Heading>
    </Container>
  </Layout>
);

const Page403 = () => (
  <Layout>
    <Container maxW="5xl" py="4rem">
      <Heading as="h1">Error 403!</Heading>
      <Heading as="h3" fontSize="xl">
        Thou shalt not pass!
      </Heading>
    </Container>
  </Layout>
);

// default export
export default App;
