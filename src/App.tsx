import Header from "./components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from './components/Loader/Loader.tsx';
import './scss/app.scss';

const Home = lazy(() => import("./pages/Home.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
