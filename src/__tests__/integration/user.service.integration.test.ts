import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '@services/user.service';

const mockApiClient = {
  post: vi.fn(),
};

vi.mock('@utils/axios-utilities', () => ({
  apiClient: () => mockApiClient,
}));

describe('userService integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the signup endpoint and return data', async () => {
    const mockResponse = { data: { token: 'jwt-token', user: { id: 1 } } };
    mockApiClient.post.mockResolvedValueOnce(mockResponse);
    const params = { data: { username: 'test', email: 'test@mail.com', password: '123456' } };
    const result = await userService.postSignUp(params).call;
    expect(mockApiClient.post).toHaveBeenCalledWith('/v1/users/signup', params.data);
    expect(result).toEqual(mockResponse);
  });
}); 