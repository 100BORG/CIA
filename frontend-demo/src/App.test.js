import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the components to avoid router issues in testing
jest.mock('./components/FrontPage', () => () => <div>Front Page Mock</div>);

test('renders the app without crashing', () => {
  render(<App />);
  const pageElement = screen.getByText(/Front Page Mock/i);
  expect(pageElement).toBeInTheDocument();
});
