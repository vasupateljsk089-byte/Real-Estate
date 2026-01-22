import { createBrowserRouter } from "react-router-dom";

/* layouts */
import Layout from "@/layout/Layout";
import AuthLayout from "@/layout/AuthLayout";

import ProtectedRoute from '@/routes/ProtectedRoute';

/* pages */
import Home from "../pages/home/Home";
// import Listpage from "../pages/listPages/Listpages";
// import Singlepage from "../pages/singlePage/Singlepage";
// import UpdateProfile from "../pages/profileUpdate/Updateprofile";
// import NewPostPage from "../pages/createPost/CreatePost";

/* auth pages */
import LoginForm from "@/pages/auth/Login";
import SignupForm from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import ResetPasswordForm from "@/pages/auth/ResetPasswordForm";
import Profile from "../pages/auth/Profile";

/* loaders */
// import {
//   // singlePageLoader,
//   listPageLoader,
//   // profilePageLoader,
// } from "../lib/loader";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/list",
      //   element: <Listpage />,
      //   loader: listPageLoader,
      // },
      // {
      //   path: "/:id",
      //   element: <Singlepage />,
      //   loader: singlePageLoader,
      // },
    ],
  },

//   /* 🔐 Auth pages */
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <SignupForm /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-otp", element: <VerifyOtp /> },
      { path: "/reset-password", element: <ResetPasswordForm /> },
      { path: "/profile",
        element:( 
        <ProtectedRoute>
            <Profile/>
        </ProtectedRoute>
        )
      }
    ],
  },

]);
