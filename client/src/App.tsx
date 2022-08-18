import React from "react";
import { Outlet, useParams } from "react-router";
import Navbar from "./components/layout/Navbar";
import RandomPlanet from "./components/primary-pages/RandomPlanet";

function App() {
  const params = useParams();
  return (
    <>
      {/* Background image */}
      <div
        className="min-w-screen min-h-screen"
        style={{ backgroundImage: "url(./img/Starry-night.svg)" }}
      >
        <Navbar />
        {/* If no params (eg. https://url.com/), send to random planet */}
        {Object.keys(params).length === 0 && <RandomPlanet />}
        <Outlet />
      </div>
    </>
  );
}

export default App;
