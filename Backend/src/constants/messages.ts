export const MESSAGES = {
  AUTH: {

    UNAUTHORIZED: "Unauthorized",
    TOKEN_MISSING: "Access token missing",
    TOKEN_EXPIRED: "Access token expired",
    INVALID_TOKEN: "Invalid access token",
    USER_NOT_FOUND: "User not found",
    ME_SUCCESS: "User fetched successfully",
    // Login / Register
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_SUCCESS: "Login successful",
    LOGIN_FAILED: "Failed to login",
    REGISTER_SUCCESS: "Registration successful",
    REGISTER_FAILED: "Failed to register",
    EMAIL_EXISTS: "Email already exists",

    // Logout
    LOGOUT_SUCCESS: "Logout successful",

    // Forgot password / OTP
    EMAIL_REQUIRED: "Email is required",
    OTP_SENT: "OTP sent to your email",
    OTP_SENT_IF_EXISTS: "Please enter registered email address.",
    OTP_FAILED: "Failed to send OTP",
    INVALID_OTP: "Invalid OTP",
    OTP_VERIFIED: "OTP verified successfully",

    // Reset password
    PASSWORD_RESET_SUCCESS: "Password reset successfully",

    AUTH_REQUIRED: "Authentication required",
    // USER_NOT_FOUND: "User no longer exists",
    SESSION_EXPIRED: "Session expired",
    // INVALID_TOKEN: "Invalid authentication token",
  },

  USER: {
  FETCH_ALL_SUCCESS: "Users fetched successfully",
  FETCH_ALL_FAILED: "Failed to get users",

  UPDATE_SUCCESS: "User updated successfully",
  UPDATE_FAILED: "Failed to update user",

  DELETE_SUCCESS: "User deleted successfully",
  DELETE_FAILED: "Failed to delete user",

  POST_SAVED: "Post saved successfully",
  POST_UNSAVED: "Post removed from saved list",
  POST_SAVE_FAILED: "Failed to save post",

  PROFILE_POSTS_SUCCESS: "Profile posts fetched successfully",
  PROFILE_POSTS_FAILED: "Failed to get profile posts",

  NOT_AUTHORIZED: "Not authorized to perform this action",
},

 CHAT: {
    FETCH_ALL_SUCCESS: "Chats fetched successfully",
    FETCH_ALL_FAILED: "Failed to get chats",

    FETCH_ONE_SUCCESS: "Chat fetched successfully",
    FETCH_ONE_FAILED: "Failed to get chat",

    CREATE_SUCCESS: "Chat created successfully",
    CREATE_FAILED: "Failed to create chat",

    READ_SUCCESS: "Chat marked as read",
    READ_FAILED: "Failed to read chat",

    NOT_FOUND: "Chat not found",
  },

   MESSAGE: {
    TEXT_REQUIRED: "Message text is required",
    SEND_SUCCESS: "Message sent successfully",
    SEND_FAILED: "Failed to send message",
  },

  EMAIL: {
    EMAIL_SENT: "Email sent successfully",
    EMAIL_FAILED: "Email sending failed",
    RESET_PASSWORD_SUBJECT: "Reset Password OTP",
  },

  POST: {
    FETCH_ALL_SUCCESS: "Posts fetched successfully",
    FETCH_ALL_FAILED: "Failed to get posts",

    FETCH_ONE_SUCCESS: "Post fetched successfully",
    FETCH_ONE_FAILED: "Failed to get post",

    CREATE_SUCCESS: "Post created successfully",
    CREATE_FAILED: "Failed to create post",

    UPDATE_SUCCESS: "Post updated successfully",
    UPDATE_FAILED: "Failed to update post",

    DELETE_SUCCESS: "Post deleted successfully",
    DELETE_FAILED: "Failed to delete post",

    NOT_FOUND: "Post not found",
    NOT_AUTHORIZED: "You are not authorized",
  },

  COMMON: {
    SUCCESS: "Success",
    INTERNAL_ERROR: "Internal server error",
    INVALID_REQUEST: "Invalid request",
    
  },
} as const;
