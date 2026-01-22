import './App.css'
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from '@/routes/routes';
import {useAppDispatch} from '@/hooks/hooks';
import { useEffect } from 'react';
import {getMe} from '@/services/auth.service';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
    <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            padding: "12px 12px",
            fontWeight: 500,
          },
          success: {
            style: {
              background: "#ECFDF5",
              color: "#065F46",
              border: "1px solid #A7F3D0",
            },
          },
          error: {
            style: {
              background: "#FAD2D2",
              color: "#991B1B",
              border: "1px solid #FECACA",
            },
          },
        }}
      />

    </>
  );
}


