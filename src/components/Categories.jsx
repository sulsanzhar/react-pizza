import React, { useContext } from "react";

const Categories = ({selectedCategory, onChangeSelector}) => {
    const categoriesArr = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    return (
        <div className="categories">
            <ul>
                {categoriesArr.map((name, index) => (
                  <li key={index} onClick={() => onChangeSelector(index)} className={selectedCategory === index ? 'active' : ''}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;