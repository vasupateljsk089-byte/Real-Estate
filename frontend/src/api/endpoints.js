const BASE_URL = "/api";

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
};

export const USER_ENDPOINTS = {
  GET_USERS: `${BASE_URL}/user/`,
  GET_USER_BY_ID: (id) => `${BASE_URL}/user/${id}`,
  UPDATE_USER: (id) => `${BASE_URL}/user/${id}`,
    DELETE_USER: (id) => `${BASE_URL}/user/${id}`,
    SAVE_POST: `${BASE_URL}/user/save`,
    PROFILE_POSTS: `${BASE_URL}/user/profilePosts`,
};

export const POST_ENDPOINTS = {
  CREATE_POST: `${BASE_URL}/post/`,
  GET_ALL_POSTS: `${BASE_URL}/post/`,
    GET_POST_BY_ID: (id) => `${BASE_URL}/post/${id}`,
    UPDATE_POST: (id) => `${BASE_URL}/post/${id}`,
    DELETE_POST: (id) => `${BASE_URL}/post/${id}`,
};

export const CHAT_ENDPOINTS = {
    GET_USER_CHATS: `${BASE_URL}/chats/`,
    CREATE_CHAT: `${BASE_URL}/chats/`,
    READ_CHAT: (id) => `${BASE_URL}/chats/${id}`,
};    
