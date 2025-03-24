import React from "react";
import debounce from 'lodash.debounce';
import styles from "./Search.module.scss";
import { setSearchValue } from "../../redux/slices/filterSilce.js";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";

const Search = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector(state => state.filter);

  const onClearInput = () => {
    dispatch(setSearchValue());
    setValue("");
    inputRef.current && inputRef.current.focus();
  }

  const debounceInput = React.useCallback(debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300), []);


  const onChangeInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceInput(e.target.value);
  }

  return (
    <div className={styles.root}>
      <input ref={inputRef } className={styles.input} value={value} onChange={(e) => onChangeInput(e)} placeholder="Поиск пиццы..." type="text" />
      <svg className={styles.searchIcon} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
          fillRule="nonzero" />
      </svg>
      {
        searchValue && (
          <svg className={styles.deleteIcon} onClick={() => onClearInput()} xmlns="http://www.w3.org/2000/svg" x="0px"
               y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path
              d="M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z"></path>
          </svg>
        )
      }
    </div>
  );
};

export default Search;