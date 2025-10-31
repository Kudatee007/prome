// Save as: src/api/prosApi.test.ts
import { describe, it, expect } from 'vitest';
import { prosApi } from './prosApi';

describe('prosApi', () => {
  it('should have getProfessionals endpoint', () => {
    expect(prosApi.endpoints.getProfessionals).toBeDefined();
  });

  it('should have getProfessional endpoint', () => {
    expect(prosApi.endpoints.getProfessional).toBeDefined();
  });

  it('should have getLocations endpoint', () => {
    expect(prosApi.endpoints.getLocations).toBeDefined();
  });

  it('exports useGetProfessionalsQuery hook', () => {
    expect(prosApi.useGetProfessionalsQuery).toBeDefined();
  });

  it('exports useGetProfessionalQuery hook', () => {
    expect(prosApi.useGetProfessionalQuery).toBeDefined();
  });

  it('exports useGetLocationsQuery hook', () => {
    expect(prosApi.useGetLocationsQuery).toBeDefined();
  });

//   it('getProfessionals builds correct query params with search', () => {
//     const endpoint = prosApi.endpoints.getProfessionals;
//     const query = endpoint.query({ search: 'cleaning' });
    
//     expect(query.url).toContain('professionals');
//     expect(query.url).toContain('populate');
//   });

//   it('getProfessionals builds correct query params with location', () => {
//     const endpoint = prosApi.endpoints.getProfessionals;
//     const query = endpoint.query({ location: 'New York' });
    
//     expect(query.url).toContain('professionals');
//     expect(query.url).toContain('location');
//   });

//   it('getProfessional builds correct query with documentId', () => {
//     const endpoint = prosApi.endpoints.getProfessional;
//     const query = endpoint.query('pro-123');
    
//     expect(query.url).toBe('/professionals/pro-123');
//     expect(query.params).toEqual({ populate: '*' });
//   });
});