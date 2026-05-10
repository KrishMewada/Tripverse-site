import { Outlet, useLocation } from "react-router";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export function RootLayout() {
  const location = useLocation();
  const hideNavAndFooter = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavAndFooter && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}
