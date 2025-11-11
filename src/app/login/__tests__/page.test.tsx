import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../page';

// Create mock functions
const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockSignIn = jest.fn();

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: (...args: unknown[]) => mockSignIn(...args),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
    pathname: '/login',
  }),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/пароль/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /войти/i })).toBeTruthy();
  });

  it('should handle successful login', async () => {
    mockSignIn.mockResolvedValueOnce({ error: null, ok: true, status: 200, url: null });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'admin@kamran.dev' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'admin123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'admin@kamran.dev',
        password: 'admin123',
        redirect: false,
      });
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it('should display error on failed login', async () => {
    mockSignIn.mockResolvedValueOnce({ error: 'Invalid credentials', ok: false, status: 401, url: null });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/неверный email или пароль/i)).toBeTruthy();
    });
  });

  it('should handle exception during login', async () => {
    mockSignIn.mockRejectedValueOnce(new Error('Network error'));

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'test123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/произошла ошибка при входе/i)).toBeTruthy();
    });
  });

  it('should show loading state during login', async () => {
    mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ error: null, ok: true, status: 200, url: null }), 100)));

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'test123' },
    });

    const button = screen.getByRole('button', { name: /войти/i });
    fireEvent.click(button);

    // Check if button is disabled using the disabled attribute
    await waitFor(() => {
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });
});
