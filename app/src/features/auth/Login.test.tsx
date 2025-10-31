import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import authReducer from './authSlice';

const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Create a proper mock for the login mutation
let mockLoginMutation: unknown;
let mockError: unknown = null;
let mockIsLoading = false;

vi.mock('@/api/authApi', () => ({
  useLoginMutation: () => {
    return [
      mockLoginMutation,
      { error: mockError, isLoading: mockIsLoading }
    ];
  },
}));

const renderLogin = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockError = null;
    mockIsLoading = false;
    
    // Reset the mock login mutation
    mockLoginMutation = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({
        jwt: 'test-jwt-token',
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          confirmed: true,
          blocked: false,
        },
      }),
    });
  });

  it('renders login form with all fields', () => {
    renderLogin();

    expect(screen.getByTestId('login-email')).toBeInTheDocument();
    expect(screen.getByTestId('login-password')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('displays email validation error when email field is empty', async () => {
    renderLogin();

    const submitButton = screen.getByTestId('login-submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('login-email-error')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('displays password validation error when password field is empty', async () => {
    renderLogin();

    const emailInput = screen.getByTestId('login-email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByTestId('login-submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('login-password-error')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('calls login mutation with correct credentials on valid submit', async () => {
    renderLogin();

    const emailInput = screen.getByTestId('login-email');
    const passwordInput = screen.getByTestId('login-password');
    const submitButton = screen.getByTestId('login-submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('navigates to home page on successful login', async () => {
    renderLogin();

    const emailInput = screen.getByTestId('login-email');
    const passwordInput = screen.getByTestId('login-password');
    const submitButton = screen.getByTestId('login-submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    }, { timeout: 2000 });
  });

  it('handles login mutation error', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock a failing login
    mockLoginMutation = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockRejectedValue(new Error('Network error')),
    });

    renderLogin();

    const emailInput = screen.getByTestId('login-email');
    const passwordInput = screen.getByTestId('login-password');
    const submitButton = screen.getByTestId('login-submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Login failed:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it('displays server error message', () => {
    mockError = {
      data: {
        error: {
          message: 'Invalid credentials'
        }
      }
    };
    mockIsLoading = false;

    renderLogin();
    
    expect(screen.getByTestId('login-error')).toBeInTheDocument();
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('displays default error message when error has no message', () => {
    mockError = {
      data: {}
    };
    mockIsLoading = false;

    renderLogin();
    
    expect(screen.getByTestId('login-error')).toBeInTheDocument();
    expect(screen.getByText('Login failed')).toBeInTheDocument();
  });
});