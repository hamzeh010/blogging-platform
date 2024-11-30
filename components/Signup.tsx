import React, { useState } from 'react';
import Link from 'next/link'; // Import the Link component from next/link
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import Button from './atoms/Button';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/const/const';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Renamed to 'username'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Make a POST request to the signup API
      const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }), // Send username here
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Signup successful! Please log in.');
        setEmail('');
        setPassword('');
        setUsername(''); // Clear the username field

        setTimeout(() => {
          router.push('/login'); // Redirect to homepage after success
        }, 2000); // Delay for 2 seconds before redirecting
      } else {
        setError(data.message || 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white mb-4 text-center">
              Sign up
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  maxLength={255} // Maximum characters for username
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}  // Maximum characters for email
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={20}  // Maximum characters for password
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              {successMessage && (
                <div className="text-green-500 text-sm">{successMessage}</div>
              )}

              
              <Button variant="primary" size="medium" type="submit" disabled={loading} className="w-full" >
              {loading ? 'Signing up...' : 'Sign up'}
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                do you have an account?{' '}
                <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-blue-500 underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
