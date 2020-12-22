import Axios from 'axios';
import { useQuery } from 'react-query';

export function useGetSelfQuery() {
  const token = localStorage.getItem('token');
  // const queryClient = useQueryClient();
  return useQuery('user', () =>
    Axios.get(`${process.env.REACT_APP_HOSTED_BACKEND}/user`, {
      headers: {
        Authorization: token,
      },
    }).then((resp) => resp.data)
  );
}
