import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { planets } from "../../data/data";
import PostListItem from "./PostListItem";
import Posts from "./Posts";

const PostsPage = () => {
  const navigate = useNavigate();
  const { planet } = useParams();
  const planetId = planets.indexOf(planet!) + 1;

  // If link is invalid
  useEffect(() => {
    if (!planets.includes(planet!)) {
      navigate("/");
    }
  }, [planet]);

  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-between gap-8 px-3 py-3 text-white sm:px-12 sm:py-16 md:flex-row md:items-start md:gap-16 lg:px-36">
        <div className="flex max-w-sm shrink-0 grow flex-col-reverse items-center md:flex-col lg:max-w-md">
          <h1 className="text-center text-4xl text-opacity-90 sm:mb-3 sm:text-6xl">
            {planet}
          </h1>
          <img
            src={`/img/planets/${planet}.svg`}
            alt={planet}
            className="mx-auto max-h-36 md:max-h-full"
          />
        </div>
        <Posts planetId={planetId} />
      </div>
    </>
  );
};

export default PostsPage;
