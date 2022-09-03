import React from "react";
import { Comment } from "../../features/post/postSlice";
import PostComment from "./PostComment";

interface Props {
  comments: Comment[];
}

const PostComments = (props: Props) => {
  // Total number of comments
  const commentLength = props.comments.length;
  let replyLength = 0;
  props.comments.forEach((comment) => {
    replyLength += comment.childComments.length;
  });
  const commentTotal = commentLength + replyLength;
  //

  return (
    <div className="mt-8">
      <h3 className="text-2xl text-opacity-90">{commentTotal} Comments</h3>
      {props.comments.map((comment) => {
        return <PostComment key={comment._id} comment={comment} />;
      })}
    </div>
  );
};

export default PostComments;
