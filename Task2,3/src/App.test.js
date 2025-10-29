import { render, screen } from '@testing-library/react';
import App from './App';

test('renders profile UI', () => {
  render(<App />);
  // the default profile has an Edit button in the UI
  const editButton = screen.getByText(/edit/i);
  expect(editButton).toBeInTheDocument();
});
