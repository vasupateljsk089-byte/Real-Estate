// layout/MapLayout.tsx
import { Outlet } from "react-router-dom";

const MapLayout = () => {
  return (
    <div className="h-screen bg-white font-sans overflow-hidden">
      <main className="pt-20 h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MapLayout;
