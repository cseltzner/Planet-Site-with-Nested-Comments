import React from "react";
import { planets } from "../../data/data";
import { Comment } from "../../features/post/postSlice";
import CommentReply from "./CommentReply";

interface Props {
  comment: Comment;
}

{
  /* <img
          src={`/img/planets/${planets[props.comment.user.favPlanet - 1]}.svg`}
          alt=""
        /> */
}

const PostComment = (props: Props) => {
  const favPlanet = planets[props.comment.user.favPlanet - 1];

  return (
    <>
      <div className="mt-3">
        <div className="flex flex-row gap-8 border-[3px]  border-secondary-orange bg-black p-3">
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
            <div className="mt-2 mr-4 flex justify-end gap-16">
              <button className="font-light opacity-60">Report</button>
              <button className="text-secondary-orange">Reply</button>
            </div>
          </div>
        </div>
        {props.comment.childComments.map((comment) => {
          return (
            <>
              <CommentReply reply={comment} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default PostComment;
