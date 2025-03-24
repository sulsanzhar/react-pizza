import { useEffect, useRef, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort.tsx";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock, {TPizza} from "../components/PizzaBlock";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAppSelector} from "../redux/store.ts";

const Home = () => {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const { searchValue } = useAppSelector(state => state.filter);
  const { categoryId, sortType} = useAppSelector(state => state.filter);

  const [items, setItems] = useState<TPizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`https://67afa6a3dffcd88a67873fcf.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.property }&order=${sortType.order}&search=${searchValue}`)

      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //
  //     dispatch(setFilters(params));
  //     isSearch.current = true;
  //   }
  // }, [window.location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if(!isSearch.current){
      fetchPizzas();
    }

    isSearch.current = false;
  }, [sortType.order, sortType.name, sortType.property, categoryId, searchValue]);

  // useEffect(() => {
  //   const queryObj = {
  //     category: categoryId,
  //     sortBy: sortType.property,
  //     order: sortType.order,
  //   };
  //
  //   const queryStr = '?' + qs.stringify(queryObj);
  //   navigate(queryStr);
  // }, [categoryId, sortType.property, sortType.order]);

  useEffect(() => {
    if (window.location.search) {
      navigate("/", { replace: true });
    }
  }, []);


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