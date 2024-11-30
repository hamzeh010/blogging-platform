import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../utils/lib/mongodb';
import Post from '../../../../models/Post';
import User from '../../../../models/User'; // Import User model to fetch user data
import mongoose from 'mongoose';


interface QueryParams {
  userId?: string;
  page?: number;
  limit?: number;
}


const handlePosts = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  if (req.method === 'GET') {
    try {
      const { userId, page = 1, limit = 10 }: QueryParams = req.query; // Get userId, page, and limit from query parameter
  
      const query: Record<string, any> = {}; // Default query 

      if (userId) {
        // If userId is provided, validate and add to the query
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid userId format' });
        }
        query.userId = userId;
      }
  
      // Set the number of posts to skip and limit the number of posts
      const skip = (Number(page) - 1) * Number(limit); // Calculate the number of posts to skip
      const postsLimit = Number(limit); // Limit number of posts per page
  
      // Fetch posts and populate user details (username and email) with pagination
      const posts = await Post.find(query)
        .populate('userId', 'username email') // Populate the userId field with username and email
        .skip(skip)
        .limit(postsLimit)
        .exec();
  
      if (!posts || posts.length === 0) {
        return res.status(404).json({ error: 'No posts found' });
      }
  
      // Return the posts with populated user details
      const postsWithUsernames = posts.map(post => ({
        ...post.toObject(), // Convert mongoose document to plain object
        username: post.userId.username, // Add the populated username
      }));
  
      // Return pagination info along with posts
      const totalPosts = await Post.countDocuments(query); // Get total number of posts for pagination
      const totalPages = Math.ceil(totalPosts / postsLimit); // Calculate total pages
  
      res.status(200).json({
        posts: postsWithUsernames,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalPosts,
        },
      });
  
    } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error fetching post:', error.message); 
    res.status(500).json({ error: 'Failed to fetching post', details: error.message });
  } else {
    console.error('Unknown error occurred', error); 
    res.status(500).json({ error: 'Failed to fetching post', details: 'An unknown error occurred' });
  }
}
  }
  
    else if (req.method === 'POST') {
    // Create a new post
    try {

      const { title, description, category, readMoreLink, userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Ensure all required fields are provided
      if (!title || !description || !category || !readMoreLink) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newPost = new Post({
        title,
        description,
        category,
        readMoreLink, // Include readMoreLink in the saved post
        userId: user._id, // Assign userId
      });

      const savedPost = await newPost.save();

      res.status(201).json(savedPost); // Return the post without timeAgo
    }catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error creating post:', error.message); // Now you can safely access error.message
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  } else {
    console.error('Unknown error occurred', error); // Handle the case where error is not an instance of Error
    res.status(500).json({ error: 'Failed to create post', details: 'An unknown error occurred' });
  }
}
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handlePosts;
