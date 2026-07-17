import { describe, it, expect } from 'vitest';
import { UserService } from '../../src/services/UserService';

describe('UserService', () => {
  it('should fetch a user by id', async () => {
    const service = new UserService();
    const user = await service.fetchUser('123');
    
    expect(user).toBeDefined();
    expect(user.id).toBe('123');
    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane.doe@example.com');
  });
});
