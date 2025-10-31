// Save as: src/api/authApi.test.ts
import { describe, it, expect } from 'vitest';
import { authApi } from './authApi';

describe('authApi', () => {
  it('should have login endpoint', () => {
    expect(authApi.endpoints.login).toBeDefined();
  });

  it('should have register endpoint', () => {
    expect(authApi.endpoints.register).toBeDefined();
  });

  it('should have me endpoint', () => {
    expect(authApi.endpoints.me).toBeDefined();
  });

  it('exports useLoginMutation hook', () => {
    expect(authApi.useLoginMutation).toBeDefined();
  });

  it('exports useRegisterMutation hook', () => {
    expect(authApi.useRegisterMutation).toBeDefined();
  });

  it('exports useMeQuery hook', () => {
    expect(authApi.useMeQuery).toBeDefined();
  });
});