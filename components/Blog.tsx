import React, { ReactNode, useState, useCallback } from 'react';
import Link from 'next/link';
import Modal from './Modal';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/const/const';
import Button from './atoms/Button';
import { getInitials, timeAgo } from '@/utils/helpers';

interface BlogProps {
  updatedPostsProp?: any;
  isOwner?: boolean
  posts: {
    _id: string;
    title: string;
    description: string;
    category: string;
    username: string;
    createdAt?: string;  // Optional property for timeAgo
    details: string;

  }[];
  children?: ReactNode;  // Explicitly defining children as ReactNode
}

const Blog: React.FC<BlogProps> = ({ posts, children, isOwner, updatedPostsProp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  // Improved delete function with better error handling and use of async/await
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const url = `${NEXT_PUBLIC_API_BASE_URL}/posts/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Handle successful deletion
        if (response.ok) {
          // Filter out the deleted post from the list
          const updatedPosts = posts.filter((post) => post._id !== id);
          updatedPostsProp(updatedPosts); // Update parent component with the new posts
          toggleModal(); // Close modal after deletion
        } else {
          // Handle error response with a custom message or fallback
          const errorData = await response.json();
          console.error('Failed to delete post:', errorData);
          alert(`Failed to delete post: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.log(error);
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post. Please try again later.');
      }
    },
    [posts, updatedPostsProp, toggleModal]
  );


  return (
    <section className="bg-white dark:bg-gray-900 h-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {/* Rendering children content here */}
        <div>{children}</div>

        <div className="grid gap-8 lg:grid-cols-2">
          {posts && posts.length != 0 && posts.map((article, index) => (
            <article
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    className="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  {article.category}
                </span>
                <span className="text-sm">  {timeAgo(article.createdAt || new Date().toISOString())}</span> {/* Fallback if timeAgo is undefined */}
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <Link href={"blog/"+article._id}>{article.title}</Link>
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                {article.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{getInitials(article.username)}</span>
</div>
                  <span className="font-medium dark:text-white">
                    {article.username || 'Unknown Author'} {/* Fallback if name is missing */}
                  </span>
                </div>

                <div className="text-right pt-2">
                  <Link
                    href={"blog/"+article._id}
                    className="inline-flex items-center font-medium text-gray-900 dark:text-blue-400 hover:underline"
                  >
                     Details
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
              {isOwner ? <div className="flex justify-end mt-4 gap-4">
                <Link
                  href={"/edit-blog/" + article._id}
                  className="rounded focus:outline-none transition-all bg-blue-500 text-white hover:bg-blue-600 text-base px-4 py-2"
                >
                  Edit
                </Link>
                <Button onClick={handleOpen} variant="primary" size="medium" type="submit" className="bg-red-500 hover:bg-red-800">
                  Delete
                </Button>

              </div> : null}

              <Modal isOpen={isOpen} onClose={handleClose} title="Are you sure?">
                <p>This action cannot be undone.</p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button onClick={handleClose} variant="primary" size="medium" type="submit" className="bg-red-500 hover:bg-red-800">
                    Close
                  </Button>
                  <Button onClick={() => handleDelete(article._id)} variant="primary" size="medium" type="submit" className="bg-blue-500">
                    Yes
                  </Button>
                </div>
              </Modal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
