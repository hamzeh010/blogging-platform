import React, { useState, useEffect } from 'react';
import { getUserId } from '@/utils/auth';
import { useRouter } from 'next/router';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/const/const';

interface BlogProps {
    title: string;
    description: string;
    category: string;
    readMoreLink: string;
    userId?: any;
}

const BlogForm: React.FC = () => {
    const router = useRouter();
    const userId = getUserId(); // Get userId from localStorage or wherever it is stored
    const [article, setArticle] = useState<BlogProps>({
        title: '',
        description: '',
        category: '',
        readMoreLink: '',
        userId: userId,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const isEditMode = Boolean(router.query.id); // Check if the URL contains an ID, indicating edit mode

    useEffect(() => {
        if (isEditMode) {
            // If in edit mode, fetch the blog data and populate the form
            const fetchBlogData = async () => {
                try {
                    const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/posts/${router.query.id}`);
                    const data = await response.json();
                    setArticle(data);
                } catch (error) {
                    console.log(error);
                    setErrorMessage('Failed to load blog data.');
                }
            };

            fetchBlogData();
        }
    }, [isEditMode, router.query.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); // Clear previous error message
        setSuccessMessage(null); // Clear previous success message

        try {
            const url = isEditMode ? `${NEXT_PUBLIC_API_BASE_URL}/posts/${router.query.id}` : `${NEXT_PUBLIC_API_BASE_URL}/posts`;
            const method = isEditMode ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article), // Send the article data as a JSON string
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(isEditMode ? 'Post updated successfully!' : 'Post created successfully!');
                // Optionally, redirect or clear form after successful submission
                setArticle({
                    title: '',
                    description: '',
                    category: '',
                    readMoreLink: '',
                });
                router.push('/my-blogs');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to save post');
            }
        } catch (error) {
            setErrorMessage('An error occurred while saving the post.');
            console.error('Error saving post:', error);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white text-center">
                            {isEditMode ? 'Edit Blog' : 'Create Blog'}
                        </h2>

                        {/* Display success or error message */}
                        {errorMessage && (
                            <div className="text-red-500 text-sm">{errorMessage}</div>
                        )}
                        {successMessage && (
                            <div className="text-green-500 text-sm">{successMessage}</div>
                        )}

                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={article.title}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter title"
                                    required
                                    maxLength={250}
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={article.description}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter description"
                                    required
                                    maxLength={250}
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={article.category}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter category"
                                    required
                                    maxLength={250}
                                />
                            </div>

                            <div>
                                <label htmlFor="readMoreLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Read More Link
                                </label>
                                <input
                                    type="text"
                                    id="readMoreLink"
                                    name="readMoreLink"
                                    value={article.readMoreLink}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter read more link"
                                    required
                                    maxLength={250}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-[#0284c7] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isEditMode ? 'Edit' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BlogForm;
