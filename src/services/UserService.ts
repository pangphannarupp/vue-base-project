import type { User } from '../models/User';

export class UserService {
  // Simulate fetching a user from an API
  async fetchUser(id: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          avatarUrl: 'https://i.pravatar.cc/150?u=jane',
        });
      }, 500);
    });
  }
}

export const userService = new UserService();
