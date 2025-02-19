import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSilce";

const Categories = () => {
    const categoriesArr = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
    const dispatch = useDispatch();
    const { categoryId } = useSelector(state => state.filter);

    return (
        <div className="categories">
            <ul>
                {categoriesArr.map((name, index) => (
                  <li key={index} onClick={() => dispatch(setCategoryId(index))} className={categoryId === index ? 'active' : ''}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;