import React from "react";
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { onAddCart } from "../../redux/slices/cartSlice.ts";
import { Link } from "react-router-dom";

export type TPizza = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    category: string,
    rating: number,
    size: number;
    count: number;
}

const PizzaBlock = ({ id, imageUrl, title, price, category }: TPizza) => {
    const sizes =[25, 30, 35];
    const [activeSize, setActiveSize] = React.useState(0);
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector((state) => state.cart);
  
  const onClickAdd = () => {
    const pizzaObj = {
      id,
      imageUrl,
      title,
      size: sizes[activeSize],
      price,
      category
    };
    
    const cartFromLS = JSON.parse(localStorage.getItem('cart') || JSON.stringify({
      items: [],
      totalCount: 0,
      totalPrice: 0
    }));
    
    const existingPizza = cartFromLS.items.find(
      (item: TPizza) => item.id === pizzaObj.id && item.size === pizzaObj.size
    );
    
    if (existingPizza) {
      existingPizza.count += 1;
    } else {
      cartFromLS.items.push({ ...pizzaObj, count: 1 });
    }
    
    cartFromLS.totalCount = cartFromLS.items.reduce((acc: number, item: TPizza) => acc + item.count, 0);
    cartFromLS.totalPrice = cartFromLS.items.reduce((acc: number, item: TPizza) => acc + item.price * item.count, 0);
    
    localStorage.setItem('cart', JSON.stringify(cartFromLS));
    
    dispatch(onAddCart(pizzaObj));
  };
  
  return (
      <div className="pizza-block-wrapper">
        <div className="pizza-block">
          <Link to={`Pizza/${id}`}>
            <img
              className="pizza-block__image"
              src={imageUrl}
              alt="Pizza"
            />
            <h4 className="pizza-block__title">{title}</h4>
          </Link>
          <div className="pizza-block__selector">
            <ul>
              {sizes.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActiveSize(index)}
                  className={`${activeSize === index ? 'active' : ''}`}
                >
                  {item} см.
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{price}</div>
            <button onClick={() => onClickAdd()} className="button button--outline button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              <i>
                {
                  cartItems.items
                    .filter(item => item.id === id && item.title === title)
                    .reduce((acc, item) => acc + item.count, 0)
                }
              </i>
            </button>
          </div>
        </div>
      </div>
  );
}
export default PizzaBlock;