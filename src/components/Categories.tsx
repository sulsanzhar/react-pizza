import { setCategoryId } from "../redux/slices/filterSilce.js";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";

const Categories = () => {
    const categoriesArr = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
    const dispatch = useAppDispatch();
    const { categoryId } = useAppSelector(state => state.filter);

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