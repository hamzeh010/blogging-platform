import React, { ReactNode, useState, useCallback  } from 'react';
import Link from 'next/link';
import Modal from './Modal';
import Image from 'next/image';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/const/const';

interface BlogProps {
  updatedPostsProp?:any;
  isOwner?:boolean
  posts: {
    _id: string;
    title: string;
    description: string;
    category: string;
    username: string;
    timeAgo?: string;  // Optional property for timeAgo
    readMoreLink: string;
  
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
          {posts && posts.length !=0 && posts.map((article, index ) => (
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
                <span className="text-sm">{article.timeAgo || 'Just Now'}</span> {/* Fallback if timeAgo is undefined */}
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href={article.readMoreLink}>{article.title}</a>
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                {article.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {!article.username ? (
                    <Image
                      className="w-7 h-7 rounded-full"
                      src={article.username}
                      alt={`${article.username}'s avatar`}
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gray-300"></div> // Fallback if avatarUrl is missing
                  )}
                  <span className="font-medium dark:text-white">
                    {article.username || 'Unknown Author'} {/* Fallback if name is missing */}
                  </span>
                </div>
                
                <div className="text-right pt-10">
              <a
                  href={article.readMoreLink}
                  className="inline-flex items-center font-medium text-gray-900 dark:text-blue-400 hover:underline"
                >
                  Read more
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
                </a>
              </div>
              </div>
              {isOwner ?    <div className="flex justify-end mt-4">
                <Link
                  href={"/edit-blog/"+article._id}
                  className="text-gray-800 bg-[#0284c7]  dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Edit
                </Link>
                <button
                  onClick={handleOpen}
                  className="text-gray-800 bg-red-500 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Delete
                </button>
                </div>:null}
           
              <Modal isOpen={isOpen} onClose={handleClose} title="Are you sure?">
                <p>This action cannot be undone.</p>
               <div className="flex justify-end gap-2 mt-4">
               <button
                  onClick={handleClose}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  onClick={()=>handleDelete(article._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Yes
                </button>
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