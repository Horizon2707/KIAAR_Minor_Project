import "../Styles/App.css";
import { Form } from "./Form";
import { NewForm } from "./NewForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultEntry from "./ResultEntry";
import NotDefined from "./NotDefined";
import Crops from "./Crops";
import Recom from "./Recom";
import Login from "./Login";
import Sign from "./Sign";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/test" element={<NewForm />} />
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<Sign />} />
          <Route path="/resultentry" element={<ResultEntry />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/recommendations" element={<Recom />}></Route>
          <Route path="*" element={<NotDefined />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
