import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import UserView from '../../src/views/UserView.vue';

// Mock the viewmodel hook
const mockUseUserViewModel = vi.fn();
vi.mock('../../src/viewmodels/useUserViewModel', () => ({
  useUserViewModel: () => mockUseUserViewModel()
}));

describe('UserView.vue', () => {
  it('renders loading state', () => {
    mockUseUserViewModel.mockReturnValue({
      user: null,
      isLoading: true,
      error: null,
      loadUser: vi.fn()
    });

    const wrapper = mount(UserView);
    expect(wrapper.text()).toContain('Loading user data...');
  });

  it('renders user details when loaded', () => {
    mockUseUserViewModel.mockReturnValue({
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'img.jpg'
      },
      isLoading: false,
      error: null,
      loadUser: vi.fn()
    });

    const wrapper = mount(UserView);
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('john@example.com');
  });
});
