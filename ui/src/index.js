import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "./Components/Theme";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
