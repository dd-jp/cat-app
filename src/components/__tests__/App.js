import { render } from '@testing-library/react';
import App from '../App';

jest.mock('../../pages/Home');
jest.mock('../../pages/Upload');

describe('App', () => {
  test('renders Home and upload', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('mock-home')).toBeInTheDocument();
    expect(getByTestId('mock-upload')).toBeInTheDocument();
  });
});
