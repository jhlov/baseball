import classNames from "classnames";
import React from "react";
import "./App.scss";
import Game from "./Game";

function App() {
  const isMobile = true;

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <Game />
      </div>
    </div>
  );
}

export default App;
