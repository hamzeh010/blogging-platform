import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/types/post.interface';

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
  },
});

export const { setBlogs } = postsSlice.actions;
export default postsSlice.reducer;
