import React from "react";
import { planets } from "../../data/data";
import { ChildComment } from "../../features/post/postSlice";

interface Props {
  reply: ChildComment;
}

const CommentReply = (props: Props) => {
  const favPlanet = planets[props.reply.user.favPlanet - 1];
  return (
    <>
      <div className="mt-3 ml-6">
        <div className="flex flex-row gap-8 rounded-tl-lg border-l-[3px]  border-secondary-orange bg-black bg-opacity-70 p-3">
          <div className="flex flex-col items-start ">
            <h4 className="font-light tracking-wide opacity-80">
              Planet_Man_24
            </h4>
            <div className="w-16">
              <img src={`/img/planets/${favPlanet}.svg`} alt={favPlanet} />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 text-lg">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
              quis, maiores voluptatum ea magnam vel minima omnis tempore
              deleniti reprehenderit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Consectetur id distinctio dicta itaque provident
              voluptatibus? Voluptates dicta quaerat quis at quas magni, dolore,
              tempore maiores molestiae est aliquam quisquam doloribus.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentReply;
