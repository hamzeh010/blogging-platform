import React, { useState, useEffect } from 'react';
import Blog from './Blog';
import { getUserId, getUsername } from '@/utils/auth';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/const/const';

interface Post {
  _id: string;
  title: string;
  description: string;
  category: string;
  username: string;
  timeAgo?: string;  // Optional property for timeAgo
  readMoreLink: string;
}

const MyBlog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State to store the posts
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  const username = getUsername();

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const userId = getUserId(); // Get userId from localStorage or wherever it is stored

      if (!userId) {
        setError('User is not logged in');
        setLoading(false);
        return;
      }

      try {
        // Pass userId as a query parameter to the API
        const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/posts?userId=${userId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data.posts); // Set the posts state with fetched data
      } catch (error) {
        console.log(error);
        setError('Error fetching posts');
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchPosts(); // Call the fetch function on mount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show loading while fetching posts
      ) : error ? (
        <p>{error}</p> // Show error message if fetch fails
      ) : (
        <Blog posts={posts} isOwner={true} updatedPostsProp={setPosts}>
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {username && username.charAt(0).toUpperCase() + username.slice(1)} Blogs
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              We use an agile approach to test assumptions and connect with the needs of your audience early and often.
            </p>
          </div>
        </Blog> // Pass fetched posts to Blog component
      )}
    </>
  );
};

export default MyBlog;