import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OpenEye from '../../assets/img/open-eye.svg';
import CloseEye from '../../assets/img/close-eye.svg';
import PizzaLogo from '../../../public/pizza-logo.svg';
// import Cookies from "js-cookie";
import axiosInstance from '../../interceptors/axios.ts';
import './Auth.scss';

const Login = () => {
  const [user, setUser] = useState({
    phone: '',
    password: '',
  });
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data: { accessToken, refreshToken } } = await axiosInstance.post('auth/login', {
        ...user,
      });
      
      // Cookies.set('accessToken', accessToken);
      // Cookies.set('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.log("error: ", error);
    }
    
    navigate('/');
  }

  console.log("user: ", user);

  return (
    <form onSubmit={(e) => onSubmitForm(e)} className="auth">
      <div className="auth__block">
        <h1>Login</h1>
        <div className="inputs">
          <div>
            <p>Username</p>
            <input onChange={onInputHandler} name="phone" type="text" />
          </div>
          <div className="password-field">
            <p>Password</p>
            <input
              onChange={onInputHandler}
              name="password"
              type={isPasswordVisible ? "text" : "password"}
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              <img src={isPasswordVisible ? CloseEye : OpenEye} alt="toggle visibility" />
            </button>
          </div>
          <button className="btn button">Login</button>
        </div>
        <p>Еще нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link></p>
        <Link to="/" className="pizza-logo">
          <img src={PizzaLogo} alt="pizza=logo" />
          <p>Главное меню</p>
        </Link>
      </div>
    </form>
  );
};

export default Login;
