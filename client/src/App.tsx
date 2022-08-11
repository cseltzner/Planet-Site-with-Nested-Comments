import React from "react";
import { Outlet, useParams } from "react-router";
import Navbar from "./components/Navbar";
import RandomPlanet from "./components/pages/RandomPlanet";

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
        {params && <RandomPlanet />}
        <Outlet />
      </div>
    </>
  );
}

export default App;
