// Save as: src/layout/MainLayout.test.tsx - FIXED VERSION
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';

vi.mock('./HeaderNav', () => ({
  default: ({ showHero }: { showHero?: boolean }) => (
    <div data-testid="header-mock">
      HeaderNav {showHero && '(with hero)'}
    </div>
  ),
}));

vi.mock('./Footer', () => ({
  default: () => <div data-testid="footer-mock">Footer</div>,
}));

describe('MainLayout Component', () => {
  it('renders Outlet children via Routes', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Test Content</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders HeaderNav with showHero prop', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Test</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByText(/HeaderNav.*with hero/i)).toBeInTheDocument();
  });

  it('renders Footer', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Test</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  it('renders main element', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Test</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});