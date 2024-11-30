// utils/auth.ts

export const isLoggedIn = (): boolean => {
  // Check if window is defined to ensure we are in the client-side environment
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  }
  return false; // Return false if it's called on the server side
};


// Function to get the userId directly from localStorage
export const getUserId = (): string | null => {
  if (typeof window !== 'undefined') {
    // Retrieve userId directly from localStorage
    const userId = localStorage.getItem('userId');
    return userId; // Return the userId if it exists, or null if not found
  }
  return null; // Return null if it's called on the server side
};


export const getUsername = (): string | null => {
  if (typeof window !== 'undefined') {
    // Retrieve userId directly from localStorage
    const username = localStorage.getItem('username');
    return username; // Return the userId if it exists, or null if not found
  }
  return null; // Return null if it's called on the server side
};