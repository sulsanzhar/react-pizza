import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <div className="error-message">Страница не найдена</div>
      <p>Кажется, вы заблудились. Попробуйте вернуться назад.</p>
      <Link to="/" className="back-home">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
