import React, { useContext, useState } from "react";
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import './scss/app.scss';
import { store } from './redux/store'

export const SearchContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = useState("");
  console.log("searchValue in APP: ", searchValue);

  return (
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
  );
}

export default App;
