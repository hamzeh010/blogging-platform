export interface Post {
    _id: string;
    title: string;
    description: string;
    category: string;
    username: string;
    timeAgo?: string;  // Optional property for timeAgo
    details: string;
  }