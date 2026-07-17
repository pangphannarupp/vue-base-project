import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import NewTaskView from '../../src/views/NewTaskView.vue';
import { useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('NewTaskView.vue', () => {
  it('navigates back when back button is clicked', async () => {
    const backMock = vi.fn();
    (useRouter as any).mockReturnValue({
      back: backMock
    });

    const wrapper = mount(NewTaskView);
    const backButton = wrapper.find('.back-btn');
    
    await backButton.trigger('click');
    expect(backMock).toHaveBeenCalled();
  });

  it('updates task title input', async () => {
    (useRouter as any).mockReturnValue({
      back: vi.fn()
    });

    const wrapper = mount(NewTaskView);
    const input = wrapper.find('input.task-input');
    
    await input.setValue('My New Task');
    expect((input.element as HTMLInputElement).value).toBe('My New Task');
  });
});
