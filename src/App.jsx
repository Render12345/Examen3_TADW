import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="p-4">
        <button className="btn btn-primary">Primary Button</button>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Hello React!</h2>
            <p>This is a card using daisyUI classes.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
