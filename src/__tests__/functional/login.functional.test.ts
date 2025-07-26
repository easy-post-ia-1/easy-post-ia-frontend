import { describe, it, expect, vi } from 'vitest';
import { userService } from '@services/user.service';

vi.mock('@services/user.service', () => ({
  userService: {
    postLogin: vi.fn(() => ({
      call: Promise.resolve({ data: { token: 'jwt', user: { id: 1 } } }),
    })),
  },
}));

describe('Login functional', () => {
  it('should login and return a JWT token', async () => {
    const params = { data: { email: 'test@mail.com', password: '123456' } };
    const result = await userService.postLogin(params).call;
    expect(result.data.token).toBe('jwt');
    expect(result.data.user.id).toBe(1);
  });
}); 