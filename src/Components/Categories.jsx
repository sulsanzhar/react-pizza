import React from 'react';

const Categories = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const categoriesArr = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    return (
        <div className="categories">
            <ul>
                {categoriesArr.map((name, index) => (
                  <li key={index} onClick={() => setActiveIndex(index)} className={activeIndex === index ? 'active' : ''}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;