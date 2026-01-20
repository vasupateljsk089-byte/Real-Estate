import toast from "react-hot-toast";
import { setLoading, setUser, logout } from "../store/slices/auth.slice";
import { apiConnector } from "../api/axios";
import { AUTH_ENDPOINTS } from "../api/endpoints";

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector(
        "POST",
        AUTH_ENDPOINTS.LOGIN,
        { email, password }
      );

      dispatch(setUser(res.data.user));

      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function registerUser(userData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector(
        "POST",
        AUTH_ENDPOINTS.REGISTER,
        userData
      );
      console.log("Registration response:", res);   
      dispatch(setUser(res.data.user));

      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function logoutUser(navigate) {
  return async (dispatch) => {
    try {
      await apiConnector("POST", AUTH_ENDPOINTS.LOGOUT);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };
}
