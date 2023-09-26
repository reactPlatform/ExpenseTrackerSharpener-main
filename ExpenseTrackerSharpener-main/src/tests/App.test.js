import { render, screen } from '@testing-library/react';
import App from '../App';
import Home from '../components/Home';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('home', () => {
  render(<Home />);
  const welcomeElement = screen.getByText('Welcome to Expense Tracker');
  expect(welcomeElement).toBeInTheDocument();
  const welcomeElement1 = screen.getByText('Welcome to Tracker');
  expect(welcomeElement1).not.toBeInTheDocument();
  const welcomeElement2 = screen.getByText('Welcome to Expense');
  expect(welcomeElement2).not.toBeInTheDocument();
  const welcomeElement3 = screen.getByText('Your Profile is incomplete');
  expect(welcomeElement3).toBeInTheDocument();
  const welcomeElement4 = screen.getByText('Your is incomplete');
  expect(welcomeElement4).not.toBeInTheDocument();
})
