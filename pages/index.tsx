import { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { isLoggedIn } from '../utils/auth';
import PublicBlogs from "@/components/PublicBlogs";


 function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Perform client-side check for authentication
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn(); // Assume isLoggedIn returns a Promise
      setIsAuthenticated(!loggedIn);
    };
    checkAuth();
  }, []);
  
  return (
    <div className="h-full">
         {!isAuthenticated ? (
          <PublicBlogs/>
       
      ) : (
        <section className="bg-white dark:bg-gray-900 h-full"></section>
      )}
     
    </div>
  );
}



export const getServerSideProps: GetServerSideProps = async () => {
  const isAuthenticated = !isLoggedIn();

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

export default Home;