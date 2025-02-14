import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItems = () => {
    try {
      fetch('https://67afa6a3dffcd88a67873fcf.mockapi.io/items')
        .then((response => {
          if (response.ok) {
            setIsLoading(false);
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        }))
        .then(data => setItems(data));
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <div className="home">
      <div className="content__top">
        <Categories />
        <Sort />
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