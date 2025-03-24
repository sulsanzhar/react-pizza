import Header from "./components/Header.tsx";
import Home from './pages/Home.tsx';
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";
import './scss/app.scss';

function App() {
  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
