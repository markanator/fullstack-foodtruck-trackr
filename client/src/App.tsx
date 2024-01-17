import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import CreateTruckForm from './pages/CreateTruckForm';
import Dashboard from './pages/Dashboard';
import EditTruck from './pages/EditTruck';
import Home from './pages/Home';
import ListingsPage from './pages/ListingsPage';
import TruckDetails from './pages/TruckDetails';
import { AppProvider } from './providers/AppProviders';
import { SignIn, SignUp, UserProfile, useAuth } from '@clerk/clerk-react';

const ProtectedPages = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return 'Loading...';

  return <Outlet />;
};

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
        <Route path="/auth" element={<Outlet />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedPages />}>
          <Route path=":username" element={<Dashboard />} />
          <Route path=":username/settings" element={<UserProfile routing="virtual" />} />
          <Route path="trucks" element={<ProtectedPages />}>
            <Route path="new" element={<CreateTruckForm />} />
            <Route path=":id/edit" element={<EditTruck />} />
          </Route>
        </Route>
        <Route path="/trucks" element={<Outlet />}>
          <Route index element={<ListingsPage />} />
          <Route path=":id" element={<TruckDetails />} />
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
