// Save as: src/pages/professionals/Professionals.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Professionals from './Professionals';
import * as prosApi from '@/api/prosApi';

const mockProfessionals = [
  {
    id: 1,
    documentId: 'pro-1',
    name: 'John Doe Cleaning',
    about: 'Professional cleaning service',
    address: '123 Main St',
    phone_number: '555-0100',
    email: 'john@example.com',
    location: 'New York',
    hires: 50,
    years_in_business: 5,
    employees: 10,
    images: {
      thumbnail_url: '/uploads/thumb.jpg',
      image_url: '/uploads/image.jpg',
    },
  },
  {
    id: 2,
    documentId: 'pro-2',
    name: 'Jane Smith Plumbing',
    about: 'Expert plumbing services',
    address: '456 Oak Ave',
    phone_number: '555-0200',
    email: 'jane@example.com',
    location: 'Los Angeles',
    hires: 30,
    years_in_business: 3,
    employees: 5,
    images: null,
  },
];

const mockLocations = ['New York', 'Los Angeles', 'Chicago'];

vi.mock('@/api/prosApi', () => ({
  useGetProfessionalsQuery: vi.fn(() => ({
    data: mockProfessionals,
    isLoading: false,
    error: null,
  })),
  useGetLocationsQuery: () => ({
    data: mockLocations,
    isLoading: false,
    error: null,
  }),
}));

vi.mock('@/utils/strapi', () => ({
  toAbsoluteUrl: (url: string) => `http://localhost:1337${url}`,
}));

const renderProfessionals = () => {
  return render(
    <BrowserRouter>
      <Professionals />
    </BrowserRouter>
  );
};

describe('Professionals Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input', () => {
    renderProfessionals();
    
    const searchInput = screen.getByPlaceholderText('What service do you need?');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders location select dropdown', () => {
    renderProfessionals();
    
    const locationSelect = screen.getByRole('combobox');
    expect(locationSelect).toBeInTheDocument();
    expect(screen.getByText('All Locations')).toBeInTheDocument();
  });

  it('displays all locations in dropdown', () => {
    renderProfessionals();
    
    mockLocations.forEach((location) => {
      expect(screen.getByRole('option', { name: location })).toBeInTheDocument();
    });
  });

  it('renders professional cards', () => {
    renderProfessionals();
    
    expect(screen.getByText('John Doe Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith Plumbing')).toBeInTheDocument();
  });

  it('displays professional count', () => {
    renderProfessionals();
    
    expect(screen.getByText('2 professionals found')).toBeInTheDocument();
  });

  it('updates search query on input change', async () => {
    renderProfessionals();
    
    const searchInput = screen.getByPlaceholderText('What service do you need?');
    fireEvent.change(searchInput, { target: { value: 'cleaning' } });
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('cleaning');
    });
  });

  it('updates location filter on select change', async () => {
    renderProfessionals();
    
    const locationSelect = screen.getByRole('combobox');
    fireEvent.change(locationSelect, { target: { value: 'New York' } });
    
    await waitFor(() => {
      expect(locationSelect).toHaveValue('New York');
    });
  });

  it('displays clear filters button when filters are active', async () => {
    renderProfessionals();
    
    const searchInput = screen.getByPlaceholderText('What service do you need?');
    fireEvent.change(searchInput, { target: { value: 'cleaning' } });
    
    await waitFor(() => {
      expect(screen.getByText('Clear filters')).toBeInTheDocument();
    });
  });

  it('clears filters when clear button is clicked', async () => {
    renderProfessionals();
    
    const searchInput = screen.getByPlaceholderText('What service do you need?');
    const locationSelect = screen.getByRole('combobox');
    
    fireEvent.change(searchInput, { target: { value: 'cleaning' } });
    fireEvent.change(locationSelect, { target: { value: 'New York' } });
    
    await waitFor(() => {
      const clearButton = screen.getByText('Clear filters');
      fireEvent.click(clearButton);
    });
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('');
      expect(locationSelect).toHaveValue('');
    });
  });

  it('renders view profile buttons for each professional', () => {
    renderProfessionals();
    
    const viewProfileButtons = screen.getAllByText('View profile');
    expect(viewProfileButtons).toHaveLength(mockProfessionals.length);
  });

  it('displays professional details correctly', () => {
    renderProfessionals();
    
    // Check first professional
    expect(screen.getByText('50 hires')).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
    
    // Check second professional
    expect(screen.getByText('30 hires')).toBeInTheDocument();
    expect(screen.getByText(/456 Oak Ave/)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    vi.mocked(prosApi.useGetProfessionalsQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    renderProfessionals();
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('displays error state', () => {
    vi.mocked(prosApi.useGetProfessionalsQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch' },
    } as any);

    renderProfessionals();
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
  });
});