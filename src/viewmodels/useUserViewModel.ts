import { ref, type Ref } from 'vue';
import type { User } from '../models/User';
import { userService } from '../services/UserService';

export function useUserViewModel() {
  const user: Ref<User | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const loadUser = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      user.value = await userService.fetchUser(id);
    } catch (err: any) {
      error.value = err.message || 'Failed to load user';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    isLoading,
    error,
    loadUser,
  };
}
