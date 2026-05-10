import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Destinations } from "./pages/Destinations";
import { DestinationDetails } from "./pages/DestinationDetails";
import { Dashboard } from "./pages/Dashboard";
import { Itinerary } from "./pages/Itinerary";
import { Booking } from "./pages/Booking";
import { Checkout } from "./pages/Checkout";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import { AdminDashboard } from "./pages/AdminDashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "destinations", Component: Destinations },
      { path: "destinations/:id", Component: DestinationDetails },
      { path: "dashboard", Component: Dashboard },
      { path: "itinerary", Component: Itinerary },
      { path: "booking/:id", Component: Booking },
      { path: "checkout", Component: Checkout },
      { path: "confirmation", Component: BookingConfirmation },
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
]);
