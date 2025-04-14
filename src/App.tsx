import Header from "./components/Header.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from 'react';
import Loader from './components/Loader/Loader.tsx';
import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import { useAppDispatch } from './redux/store.ts';
import { loadUser } from './redux/config.ts';
import { onFillCart } from './redux/slices/cartSlice.ts';
import './scss/app.scss';

const Home = lazy(() => import("./pages/Home.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Pizza = lazy(() => import('./pages/Pizza.tsx'));

function App() {
  const { pathname } = useLocation();
  const isAuthPage = pathname.includes("/sign-up") || pathname.includes("/login");
  const dispatch = useAppDispatch();
  
  if (localStorage.getItem("cart")) {
    dispatch(onFillCart(JSON.parse(localStorage.getItem("cart")!)));
  } else {
    localStorage.setItem('cart', JSON.stringify({
      items: [],
      totalCount: 0,
      totalPrice: 0,
    }));
  };
  
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className={`wrapper ${isAuthPage ? "auth-page" : ""}`}>
      {!isAuthPage && <Header />}
      <div className="content">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}


export default App;
