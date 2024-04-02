import React, { useState } from "react";
import "../Styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Form from "./Form"; // assuming Form is exported as default
import ResultEntry from "./ResultEntry";
import NotDefined from "./NotDefined";
import Login from "./Login";
import Sign from "./Sign";
import PdfViewerComponent from "./PdfViewerComponent";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/form" />
              ) : (
                <Login setUser={setUser} replace />
              )
            }
          />
          <Route path="/signUp" element={<Sign />} />
          <Route
            path="/form"
            element={user ? <Form /> : <Navigate to="/" replace />}
          />
          <Route
            path="/resultentry"
            element={user ? <ResultEntry /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<NotDefined />} />
          <Route
            path="/pdfviewer"
            element={
              user ? (
                <PdfViewerComponent document={"output.xlsx"} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
