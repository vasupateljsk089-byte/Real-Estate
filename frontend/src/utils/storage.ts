import type { StoredUser } from "@/types/auth.types";

const USER_KEY = "auth_user";

export const storage = {
  
  setUser(user: StoredUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): StoredUser | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? (JSON.parse(data) as StoredUser) : null;
  },

  clearUser() {
    localStorage.removeItem(USER_KEY);
  },
};
