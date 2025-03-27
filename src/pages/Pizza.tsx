import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TPizza } from "../components/PizzaBlock";
import '../scss/components/_pizza.scss';


const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<TPizza>();
  const categoriesArr = ["", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  const getPizzaInfo = async () => {
    try {
      const { data } = await axios.get(`https://67afa6a3dffcd88a67873fcf.mockapi.io/items?id=${id}`);
      if(data) setPizza(data[0]);

    } catch (error) {
      console.log("error:", error);
    }
  }

  console.log("pizza: ", pizza);

  useEffect(() => {
    getPizzaInfo();
  }, [id]);

  return (
    <div className="pizza">
      <div className="container">
        <div className="pizza-inner">
          <div>
            <img src={pizza?.imageUrl} alt="pizza-image" />
          </div>
          <div>
            <h2>{pizza?.title}</h2>
            <p>Категория: {categoriesArr[Number(pizza?.category)]}</p>
            <p>Цена: {pizza?.price} тенге</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;