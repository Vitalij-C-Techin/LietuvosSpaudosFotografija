import { render } from '@testing-library/react';
import Navbar from '../../components/Navbar';

test('renders navbar', () => {
  const { getByTestId } = render(<Navbar />);
  const navbarElement = getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});
