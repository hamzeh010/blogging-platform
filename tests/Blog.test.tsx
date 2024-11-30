// Blog.test.tsx
import Blog from '@/components/Blog';
import { render, screen } from '@testing-library/react';
// Example mock data for testing

interface Post {
    _id: string;
    title: string;
    description: string;
    category: string;
    username: string;
    createdAt?: string;  // Optional property for timeAgo
    details: string;

}
const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'First Post',
    description: 'This is the first post',
    category: 'Tech',
    username: 'user1',
    details: 'This is the detailed content of the first post',
  },
  {
    _id: '2',
    title: 'Second Post',
    description: 'This is the second post',
    category: 'Health',
    username: 'user2',
    details: 'This is the detailed content of the second post',
  },
];

describe('Blog component', () => {
  test('renders posts correctly', () => {
    render(<Blog posts={mockPosts} />);

    // Check that the posts are rendered
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('This is the first post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('This is the second post')).toBeInTheDocument();
  });
});
