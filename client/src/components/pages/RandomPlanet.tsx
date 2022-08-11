import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { planets } from "../../data/data";
const RandomPlanet = () => {
  const navigate = useNavigate();
  console.log("randomplanet rendered");

  useEffect(() => {
    const planetIndex = Math.floor(Math.random() * planets.length);
    navigate(`/planets/${planets[planetIndex]}`);
  }, []);
  return null;
};

export default RandomPlanet;
