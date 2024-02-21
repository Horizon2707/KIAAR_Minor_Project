import "../Styles/App.css";
import { Form } from "./Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recommendations from "./Recommendations";
import NotDefined from "./NotDefined";
import Crops from "./Crops";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="*" element={<NotDefined />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
