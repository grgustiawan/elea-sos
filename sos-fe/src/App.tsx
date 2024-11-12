import React, { useRef, useEffect } from 'react';
import { GlobalProvider } from "./util/GlobalProvider";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import gsap from 'gsap';
import MenuFooter from "./components/Menu";
import MainView from "./pages/Main";
import ItemDetail from "./pages/ItemDetail";
import ShoppingCart from "./pages/ShoppingCart";
import OrderSummary from "./pages/OrderSummary";
import TableSelection from "./pages/TableSelection";
import GopayPin from "./pages/GopayPin";
import GopayReview from "./pages/GopayReview";
import MenuList from "./pages/MenuList";
import HomeView from "./pages/Home";
import GopaySuccess from "./pages/GopayComplete";
import OrderSuccess from "./pages/OrderSuccess";
import LoginPage from "./pages/LoginPage";
import Promotion from './pages/Promotion';

const usePageTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [location]);

  return containerRef;
};

const Layout: React.FC = () => {
  const containerRef = usePageTransition();
  const location = useLocation();
  const excMenu = ["/main"];
  
  return (
    <div className="flex flex-col min-h-screen">
      <div ref={containerRef} className="flex-grow">
        <Outlet />
      </div>
      {excMenu.includes(location.pathname) && <MenuFooter />}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/main", element: <MainView /> },
      { path: "/item/:id", element: <ItemDetail /> },
      { path: "/cart", element: <ShoppingCart /> },
      { path: "/order-summary", element: <OrderSummary /> },
      { path: "/category", element: <MenuList /> },
      { path: "/table", element: <TableSelection /> },
      { path: "/gopay-review", element: <GopayReview /> },
      { path: "/gopay-confirmation", element: <GopayPin /> },
      { path: "/gopay-success", element: <GopaySuccess /> },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/promotion", element: <Promotion />},
      { path: "/login", element: <LoginPage /> }
    ]
  }
]);

const App: React.FC = () => {
  return (
    <div className="relative max-w-md mx-auto bg-teal-50 min-h-screen">
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </div>
  );
};

export default App;