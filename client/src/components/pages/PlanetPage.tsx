import React from "react";
import { useParams } from "react-router";

const PlanetPage = () => {
  const { planet } = useParams();
  console.log(planet);
  return (
    <>
      <div className="flex flex-col gap-12 md:flex-row">
        <img src={`/img/planets/${planet}.svg`} alt={`${planet}`} />
      </div>
    </>
  );
};

export default PlanetPage;
