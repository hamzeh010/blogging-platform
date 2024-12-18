import React, { useState, useEffect } from 'react';
import Blog from './Blog';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/const/const';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setBlogs } from '@/redux/postsSlice';

const PublicBlogs: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts); // Access posts from Redux store
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/posts`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        dispatch(setBlogs(data.posts)); // Store posts in Redux
      } catch (error) {
        console.error(error);
        setError('Error fetching posts');
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };
  
    fetchPosts(); // Call the fetch function on mount
  }, [dispatch]); // Include 'dispatch' in the dependency array

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Show loading while fetching posts
      ) : error ? (
        <p>{error}</p> // Show error message if fetch fails
      ) : (
        <Blog 
        posts={posts}
        isOwner={false} >
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Public Blogs
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">This page covers a wide range of general topics and insights shared by users across various industries. It serves as a comprehensive resource for business, technical, and project management strategies.</p>
          </div>
        </Blog> // Pass fetched posts to Blog component
      )}
    </>
  );
};

export default PublicBlogs;
