import Header from "./components/Header.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from 'react';
import Loader from './components/Loader/Loader.tsx';
import SignUp from "./pages/Auth/SignUp.tsx";
import Login from "./pages/Auth/Login.tsx";
import './scss/app.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from './redux/store.ts';
import { loadUser } from './redux/config.ts';

const Home = lazy(() => import("./pages/Home.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Pizza = lazy(() => import('./pages/Pizza.tsx'));

function App() {
  const { name } = useAppSelector(state => state.user)
  const { pathname } = useLocation();
  const isAuthPage = pathname.includes("/sign-up") || pathname.includes("/login");
  const dispatch = useDispatch<AppDispatch>();
  
  console.log("name: ", name);
  
  
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
