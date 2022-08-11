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
        className="absolute inset-0 bg-cover bg-center bg-repeat"
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
