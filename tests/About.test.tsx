import AboutPage from '@/pages/about';
import { render, screen } from '@testing-library/react';


test('it displays "About Us" text', () => {
  render(<AboutPage />);
  
  // Use a regular expression with 'i' for case-insensitive matching
  const aboutText = screen.getByText(/about/i);
  
  expect(aboutText).toBeInTheDocument();
});
