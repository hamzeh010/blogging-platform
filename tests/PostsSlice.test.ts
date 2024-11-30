
import { setBlogs } from '@/redux/postsSlice';
import { Post } from '@/types/post.interface';
import postsReducer from '@/redux/postsSlice';

describe('postsSlice', () => {
  const initialState = {
    posts: [],
  };

  it('should handle setPosts', () => {
    // Sample posts to dispatch
    const newPosts: Post[] = [
      {
        _id: '1',
        title: 'First Post',
        description: 'This is the first post.',
        category: 'Tech',
        username: 'user1',
        details: 'Post details...',
      },
      {
        _id: '2',
        title: 'Second Post',
        description: 'This is the second post.',
        category: 'Lifestyle',
        username: 'user2',
        details: 'Post details...',
      },
    ];

    // Perform the action and get the new state
    const action = setBlogs(newPosts);
    const newState = postsReducer(initialState, action);

    // Assert the state was updated correctly
    expect(newState.posts).toEqual(newPosts);
  });
});
