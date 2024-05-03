import useSWR from 'swr';
import axios from 'axios';

const fetchLoggedInStatus = async () => {
    try {
        const response = await axios.get('/api/account/loggedin');
        return response.data.loggedIn;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error checking login status:', error);
        throw error;
      }
};

const useLoggedIn = () => {
  const { data: loggedIn, error, mutate } = useSWR('/api/account/loggedin', fetchLoggedInStatus);

  return {
    loggedIn,
    isLoading: !error && !loggedIn,
    isError: error,
    mutateLoggedIn: mutate,
  };
};

export default useLoggedIn;
