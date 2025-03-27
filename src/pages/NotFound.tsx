import { Link } from "react-router-dom";
import notFound from '../assets/img/404-error.webp';
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={notFound} alt="" />
      <p>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
      <Link to="/" className="back-home">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
