// pages/protected.tsx
import { GetServerSideProps } from 'next';
import { isLoggedIn } from '../utils/auth';

const ProtectedPage = () => {
  return (
    <div>
      <h1>Protected Content</h1>
      <p>Only accessible if logged in!</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const isAuthenticated = isLoggedIn();

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login', // Redirect to login if not logged in
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ProtectedPage;
