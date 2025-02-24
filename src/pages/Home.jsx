import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const { categoryId, sortType} = useSelector(state => state.filter);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {searchValue} = React.useContext(SearchContext);

  const getItems = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`https://67afa6a3dffcd88a67873fcf.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.property }&order=${sortType.order}&search=${searchValue}`);

      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getItems();
  }, [categoryId, sortType.property, sortType.order, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
          <Categories/>
          <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? (
            [...Array(4)].map((_, index) => <Skeleton key={index} />)
          ) : (
            items.map((item) => <PizzaBlock key={item.id} {...item} />)
          )
        }
      </div>
    </div>
  );
};

export default Home;