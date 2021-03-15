import { render } from '@testing-library/react';
import App from '../App';

jest.mock('../app-nav/AppNav');
jest.mock('../AppRouter');

describe('App', () => {
  test('renders Home and upload', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app')).toBeInTheDocument();
    expect(getByTestId('mock-app-nav')).toBeInTheDocument();
    expect(getByTestId('mock-app-router')).toBeInTheDocument();
  });
});
