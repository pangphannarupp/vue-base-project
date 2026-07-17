import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DayView from '../../src/views/DayView.vue';
import { useRouter } from 'vue-router';

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('DayView.vue', () => {
  it('renders correctly and handles routing', async () => {
    const pushMock = vi.fn();
    (useRouter as any).mockReturnValue({
      push: pushMock
    });

    const wrapper = mount(DayView, {
      global: {
        stubs: {
          KhmerDateCard: true,
          ZodiacAnimalCard: true
        }
      }
    });

    expect(wrapper.text()).toContain('ថ្ងៃ');
    
    // Check if add button exists and triggers router push
    const addButton = wrapper.find('.add-button');
    expect(addButton.exists()).toBe(true);
    
    await addButton.trigger('click');
    expect(pushMock).toHaveBeenCalledWith('/new-task');
  });
});
