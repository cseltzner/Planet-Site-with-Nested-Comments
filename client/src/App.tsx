import React from "react";
import { Outlet, useOutlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import RandomPlanet from "./components/primary-pages/RandomPlanet";

function App() {
  const outlet = useOutlet();

  return (
    <>
      {/* Background image */}
      <div
        className="min-w-screen min-h-screen"
        style={{ backgroundImage: "url(./img/Starry-night.svg)" }}
      >
        <Navbar />
        <Outlet />
        {/* If outlet is null (user is on http://url.com/) return a random planet */}
        {!outlet && <RandomPlanet />}
      </div>
    </>
  );
}

export default App;
