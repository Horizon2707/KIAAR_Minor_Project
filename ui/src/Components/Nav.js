import React from "react";
import "../Styles/Form.css";
import { Button } from "@chakra-ui/react";
function Nav() {
  return (
    <>
      <div className="navbar">
        <h1
          style={{
            fontSize: "2.5vh",
            color: "black",
            textAlign: "left",
          }}
        >
          Soil Water Test Entry Form
        </h1>
        <Button
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              sessionStorage.clear();
              window.location.reload();
            }
          }}
          background="#CCE5FF"
          color="#000000"
          size="md"
        >
          Log Out
        </Button>
      </div>
    </>
  );
}

export default Nav;
