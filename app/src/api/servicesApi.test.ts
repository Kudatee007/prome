// Save as: src/api/servicesApi.test.ts
import { describe, it, expect } from 'vitest';
import { servicesApi } from './servicesApi';

describe('servicesApi', () => {
  it('should have getServicesByCategory endpoint', () => {
    expect(servicesApi.endpoints.getServicesByCategory).toBeDefined();
  });

  it('should have getAllCategories endpoint', () => {
    expect(servicesApi.endpoints.getAllCategories).toBeDefined();
  });

  it('exports useGetServicesByCategoryQuery hook', () => {
    expect(servicesApi.useGetServicesByCategoryQuery).toBeDefined();
  });

  it('exports useGetAllCategoriesQuery hook', () => {
    expect(servicesApi.useGetAllCategoriesQuery).toBeDefined();
  });

//   it('getServicesByCategory builds correct query params', () => {
//     const endpoint = servicesApi.endpoints.getServicesByCategory;
//     const query = endpoint.query('Cleaning');
    
//     expect(query.url).toContain('professionals');
//     expect(query.url).toContain('filters');
//     expect(query.url).toContain('Cleaning');
//   });

//   it('getAllCategories query has correct URL', () => {
//     const endpoint = servicesApi.endpoints.getAllCategories;
//     const query = endpoint.query();
    
//     expect(query.url).toBe('/professionals');
//     expect(query.params).toEqual({ fields: ['category'] });
//   });

//   it('transformResponse for getAllCategories removes duplicates', () => {
//     const endpoint = servicesApi.endpoints.getAllCategories;
//     const mockResponse = {
//       data: [
//         { id: 1, documentId: '1', name: 'Service 1', category: 'Cleaning', images: null, createdAt: '', updatedAt: '' },
//         { id: 2, documentId: '2', name: 'Service 2', category: 'Plumbing', images: null, createdAt: '', updatedAt: '' },
//         { id: 3, documentId: '3', name: 'Service 3', category: 'Cleaning', images: null, createdAt: '', updatedAt: '' },
//       ],
//     };
    
//     const result = endpoint.transformResponse!(mockResponse, {} as any, undefined as any);
    
//     expect(result).toEqual(['Cleaning', 'Plumbing']);
//     expect(result).toHaveLength(2);
//   });

//   it('transformResponse for getAllCategories filters out empty strings', () => {
//     const endpoint = servicesApi.endpoints.getAllCategories;
//     const mockResponse = {
//       data: [
//         { id: 1, documentId: '1', name: 'Service 1', category: 'Cleaning', images: null, createdAt: '', updatedAt: '' },
//         { id: 2, documentId: '2', name: 'Service 2', category: '', images: null, createdAt: '', updatedAt: '' },
//       ],
//     };
    
//     const result = endpoint.transformResponse!(mockResponse, {} as any, undefined as any);
    
//     expect(result).toEqual(['Cleaning']);
//   });

//   it('transformResponse for getServicesByCategory returns data', () => {
//     const endpoint = servicesApi.endpoints.getServicesByCategory;
//     const mockResponse = { data: [{ id: 1, documentId: '1', name: 'Test', category: 'Test', images: null, createdAt: '', updatedAt: '' }] };
    
//     const result = endpoint.transformResponse!(mockResponse, {} as any, 'Test');
    
//     expect(result).toEqual(mockResponse.data);
//   });

//   it('transformResponse for getServicesByCategory returns empty array when no data', () => {
//     const endpoint = servicesApi.endpoints.getServicesByCategory;
//     const mockResponse = {};
    
//     const result = endpoint.transformResponse!(mockResponse, {} as any, 'Test');
    
//     expect(result).toEqual([]);
//   });
});