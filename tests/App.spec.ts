import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import { ThemeService } from '../src/services/ThemeService';

vi.mock('../src/services/ThemeService', () => ({
  ThemeService: {
    initTheme: vi.fn()
  }
}));

describe('App.vue', () => {
  it('calls ThemeService.initTheme on mount', () => {
    const wrapper = mount(App, {
      global: {
        stubs: ['router-view']
      }
    });

    expect(ThemeService.initTheme).toHaveBeenCalled();
    expect(wrapper.findComponent({ name: 'router-view' }).exists()).toBe(true);
  });
});
