import Header from './Components/Header';
import Categories from "./Components/Categories";
import Sort from "./Components/Sort";
import PizzaBlock from "./Components/PizzaBlock";
import './scss/app.scss';
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = () => {
    setIsLoading(true);
    try {
      const data = fetch('https://67afa6a3dffcd88a67873fcf.mockapi.io/items')
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
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                isLoading ? (
                  <p>Loading..</p>
                ) : (
                  items.map((item) => <PizzaBlock key={item.id} {...item} />)
                )
              }

            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
