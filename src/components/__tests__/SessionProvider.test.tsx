import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from '../SessionProvider';

describe('SessionProvider', () => {
  it('should render children', () => {
    render(
      <SessionProvider>
        <div data-testid="test-child">Test Content</div>
      </SessionProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child').textContent).toBe('Test Content');
  });

  it('should wrap children with NextAuth SessionProvider', () => {
    const { container } = render(
      <SessionProvider>
        <div>Child Component</div>
      </SessionProvider>
    );

    // SessionProvider should render without errors
    expect(container).toBeInTheDocument();
  });
});
