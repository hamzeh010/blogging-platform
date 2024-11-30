import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../utils/auth';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      // Redirect to login page if not logged in
      router.push('/login');
    }
  }, []);
};

export default useAuth;
