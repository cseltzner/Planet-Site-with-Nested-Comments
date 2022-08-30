import React, { useEffect } from "react";
import { Outlet, useOutlet } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Alert from "./components/alert/Alert";
import Navbar from "./components/layout/Navbar";
import RandomPlanet from "./components/primary-pages/RandomPlanet";
import { loadUser } from "./features/auth/authActions";

function App() {
  const dispatch = useAppDispatch();
  const outlet = useOutlet();
  const alerts = useAppSelector((state) => state.alert);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, []);

  return (
    <>
      {/* Background image */}
      <div
        className="min-w-screen min-h-screen bg-primary-purple"
        style={{ backgroundImage: "url(./img/Starry-night.svg)" }}
      >
        <Navbar />
        <Alert alerts={alerts} />
        <Outlet />
        {/* If outlet is null (user is on http://url.com/) return a random planet */}
        {!outlet && <RandomPlanet />}
      </div>
    </>
  );
}

export default App;
