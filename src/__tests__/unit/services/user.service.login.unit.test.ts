import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '@services/user.service';

// Create a mock for the apiClient
const mockApiClient = {
  post: vi.fn(),
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
};

// Mock the entire module
vi.mock('@utils/axios-utilities', () => ({
  apiClient: vi.fn(() => mockApiClient),
}));

describe('2. userService.postLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the login endpoint and return data on success', async () => {
    const mockResponse = { data: { token: 'jwt-token', user: { id: 1 } } };
    mockApiClient.post.mockResolvedValueOnce(mockResponse);
    const params = { data: { email: 'test@mail.com', password: '123456' } };
    const result = await userService.postLogin(params).call;
    expect(mockApiClient.post).toHaveBeenCalledWith('/v1/users/login', { user: params.data });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the API call fails', async () => {
    mockApiClient.post.mockRejectedValueOnce(new Error('Login failed'));
    const params = { data: { email: 'test@mail.com', password: '123456' } };
    await expect(userService.postLogin(params).call).rejects.toThrow('Login failed');
  });
}); 