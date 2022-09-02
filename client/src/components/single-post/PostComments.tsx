import React from "react";
import { Comment } from "../../features/post/postSlice";
import PostComment from "./PostComment";

interface Props {
  comments: Comment[];
}

const PostComments = (props: Props) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl text-opacity-90">Comments</h3>
      {props.comments.map((comment) => {
        return (
          <>
            <PostComment key={comment._id} comment={comment} />
          </>
        );
      })}
    </div>
  );
};

export default PostComments;
