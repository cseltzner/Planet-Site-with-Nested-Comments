import React, { useEffect } from "react";
import { Outlet, useOutlet } from "react-router";
import { useAppDispatch } from "./app/hooks";
import Navbar from "./components/layout/Navbar";
import RandomPlanet from "./components/primary-pages/RandomPlanet";
import { loadUser } from "./features/auth/authActions";

function App() {
  const dispatch = useAppDispatch();
  const outlet = useOutlet();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, []);

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
