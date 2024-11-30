import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/redux/store';

const BlogDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the ID from the URL

  // Select the post with the matching ID from the Redux store
  const post = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post._id === id)
  );


  return (
    <section className="bg-white dark:bg-gray-900 h-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-left lg:mb-16 mb-8">
          {post ? (
            <>
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{post.details}</p>
            </>
          ) : (
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Post not found
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
