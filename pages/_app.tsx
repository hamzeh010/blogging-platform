// pages/_app.tsx
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Layout from '../app/layout'; // Assuming layout.tsx is in the same directory or adjust accordingly
import { isLoggedIn } from '../utils/auth'; // Import your auth function
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import navigationLinks from '@/utils/const/navigationLinks';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true after the first render (client-side only)
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Only run this after the component is mounted (client-side)

    if (!isLoggedIn() && router.pathname !== '/login' && router.pathname !== '/signup') {
      router.push('/login');
    }
  }, [router, isMounted]);

  return (
    <Provider store={store}>
      <Layout>
      <Header
        logoSrc="/"
        logoImage="https://flowbite.com/docs/images/logo.svg"
        logoAlt="Flowbite Logo"
        companyName="Blogs"
        loginLink="/login"
        navigationLinks={navigationLinks}
        myBlogLink="/create-blog"
      />
        <Component {...pageProps} />
        <Footer companyName="Avertra" year={2024} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
