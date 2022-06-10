import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="container">
      {counter}
      <button onClick={() => setCounter(counter + 1)}>increment</button>
    </div>
  );
};

export default App;
