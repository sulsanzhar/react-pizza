import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortType, setSortType] = useState({name: 'популярности', property: 'rating'});
  const [order, setOrder] = useState("asc")

  const getItems = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://67afa6a3dffcd88a67873fcf.mockapi.io/items?${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortType.property }&order=${order}`);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
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
  }, [categoryIndex, sortType, order]);

  return (
    <div className="container">
      <div className="content__top">
          <Categories selectedCategory={categoryIndex} onChangeSelector={(i) => setCategoryIndex((i))}/>
          <Sort
            sortType={sortType}
            onChangeSort={(obj) => setSortType({...sortType, name: obj.name, property: obj.property})}
            order={order}
            setOrder={() => setOrder(order === "asc" ? "desc" : "asc")}
          />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? (
            [...Array(12)].map((_, index) => <Skeleton key={index} />)
          ) : (
            items.map((item) => <Index key={item.id} {...item} />)
          )
        }
      </div>
    </div>
  );
};

export default Home;