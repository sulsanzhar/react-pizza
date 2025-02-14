import Header from './components/Header';
import { Outlet } from "react-router-dom";
import './scss/app.scss';


function App() {
  return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <Outlet/>
          </div>
        </div>
      </div>
  );
}

export default App;
