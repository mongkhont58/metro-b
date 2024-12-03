// MyComponent.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '../HomePage.tsx';

test('checks if 123 is in the component', () => {
  render(<MyComponent />);
  // Provide a function to match text content
  expect(screen.getByText((content) => content.includes('123'))).toBeInTheDocument();
});
