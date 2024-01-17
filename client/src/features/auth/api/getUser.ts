import axios from '~/axios';

import { AuthUser } from '../types';

export const getAuthenticatedUser = (): Promise<AuthUser> => {
  return axios.get('/auth/me');
};
