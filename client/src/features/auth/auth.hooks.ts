import { useQuery } from '@tanstack/react-query';
import axios from '../../axios';
import { useAuth } from '@clerk/clerk-react';
import { AuthUser } from './types';

export const useUser = () => {
  const { isSignedIn, getToken, userId } = useAuth();
  return useQuery({
    queryKey: ['auth-user', userId],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await axios.get<AuthUser>('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token ?? ''}`,
        },
      });
      return data;
    },
    enabled: isSignedIn && !!userId,
  });
};
