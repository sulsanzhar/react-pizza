import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseEye from "../../assets/img/close-eye.svg";
import OpenEye from "../../assets/img/open-eye.svg";
import './Auth.scss';

const SignUp = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    address: '',
    phone: '',
    email: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmitForm = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate('/');
  }

  console.log("user: ", user)


  return (
    <form onSubmit={(e) => onSubmitForm(e)} className="auth">
      <div className="auth__block">
        <h1>Sign Up</h1>
        <div className="inputs">
          <div>
            <p>Username</p>
            <input onChange={(e) => onInputHandler(e)} name="username" type="text" />
          </div>
          <div>
            <p>Email</p>
            <input onChange={(e) => onInputHandler(e)} name="email" type="text" />
          </div>
          <div>
            <p>Phone</p>
            <input onChange={(e) => onInputHandler(e)} name="phone" type="text" />
          </div>
          <div>
            <p>Address</p>
            <input onChange={(e) => onInputHandler(e)} name="address" type="number" />
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
        <button className="btn button">Sign Up</button>
        </div>
        <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </div>
    </form>
  );
};

export default SignUp;