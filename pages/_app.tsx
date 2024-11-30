// pages/_app.tsx
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import Layout from '../app/layout'; // Assuming layout.tsx is in the same directory or adjust accordingly
import { isLoggedIn } from '../utils/auth'; // Import your auth function

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true after the first render (client-side only)
    setIsMounted(true);
    console.log("process.env.NEXT_PUBLIC_API_BASE_URL",process.env)
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
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
