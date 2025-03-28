import React, { useEffect, useRef } from "react";
import { setSortType } from '../redux/slices/filterSilce.js'
import {useAppDispatch, useAppSelector} from "../redux/store.ts";

const Sort = () => {
    const { sortType } = useAppSelector((state) => state.filter);
    const dispatch = useAppDispatch();
    const [isShow, setIsShow] = React.useState(false);
    const sortNames = [
        { name: 'популярности', property: 'rating'},
        { name: 'цене', property: 'price' },
        { name: 'алфавиту', property: 'sortByAlphabet' }
    ];
    const sortRef = useRef(null);

    const onClickSortName = (obj: {name: string, property: string}) => {
        setIsShow(false);
        dispatch(setSortType({...sortType, name: obj.name, property: obj.property}));
    };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const path = event.composedPath()

        if (sortRef.current && !path.includes(sortRef.current)) {
            setIsShow(false);
        }
    }
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
      <div ref={sortRef} className="sort">
          <div className="sort__label">
              <button onClick={() => dispatch(setSortType({...sortType, order: sortType.order === "asc" ? "desc" : "asc"}))}>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: sortType.order === "asc" ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                  >
                      <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                      />
                  </svg>
              </button>
              <b>Сортировка по:</b>
              <span onClick={() => setIsShow(!isShow)}>
                По {sortType.name}
              </span>
          </div>
          {isShow && (
            <div className="sort__popup">
                <ul>
                    {sortNames.map((obj, index) => (
                      <li
                        key={index}
                        onClick={() => onClickSortName(obj)}
                        className={sortType.property === obj.property ? `active` : ''}
                      >
                          {obj.name}
                      </li>
                    ))}
                </ul>
            </div>
          )}
      </div>
    );
};

export default Sort;