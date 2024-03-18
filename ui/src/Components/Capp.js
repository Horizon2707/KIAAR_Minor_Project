import "../Styles/App.css";
import { BrowserRouter as Router, Routes ,Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Form } from "./Form";
import ResultEntry from "./ResultEntry";
import NotDefined from "./NotDefined";
import Crops from "./Crops";
import Login from "./Login";
import Sign from "./Sign";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<Sign />} />
          <PrivateRoute path="/form" element={Form} />
          <PrivateRoute path="/resultentry" element={ResultEntry} />
          <PrivateRoute path="/crops" element={Crops} />
          <Route path="*" element={<NotDefined />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
