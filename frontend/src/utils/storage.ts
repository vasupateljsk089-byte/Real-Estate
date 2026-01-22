import type { User } from "@/store/slices/auth.slice";

type storeUser = Omit<User, "id">;

const USER_KEY = "auth_user";
const OTP_TOKEN = "resetToken";

export const storage = {
  
  setUser(user: storeUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): storeUser | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? (JSON.parse(data) as storeUser) : null;
  },
  
  clearUser() {
    localStorage.removeItem(USER_KEY);
  },

  setOtpToken(token:string)
  {
    localStorage.setItem(OTP_TOKEN,token);
  },

   getOtpToken():string | null {
    const data = localStorage.getItem(OTP_TOKEN);
    return data ;
   },

   clearOtpoToken()
   {
    localStorage.removeItem(OTP_TOKEN);
   }
};
