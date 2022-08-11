import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-repeat"
        style={{ backgroundImage: "url(./img/Starry-night.svg)" }}
      >
        <Navbar />
      </div>
    </>
  );
}

export default App;
