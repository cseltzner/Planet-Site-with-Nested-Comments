import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { planets } from "../../data/data";
import { setAlert } from "../../features/alert/alertActions";
import { addReply } from "../../features/post/postActions";
import { Comment } from "../../features/post/postSlice";
import { AlertTypes } from "../../util/alertTypes";
import CommentReply from "./CommentReply";
import dateFormat from "dateformat";

interface Props {
  comment: Comment;
}

const PostComment = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { postId } = useParams();
  const [replyActive, setReplyActive] = useState(false);
  const [replyText, setReplyText] = useState("");
  const favPlanet = planets[props.comment.user.favPlanet - 1];

  const replyToggle = () => {
    if (!isAuthenticated) {
      dispatch(setAlert("You must be logged in to comment", AlertTypes.DANGER));
      navigate("/login");
      return;
    }
    setReplyActive((prevState) => !prevState);
  };

  const replyTextChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyText(e.target.value);
  };

  const cancelReplyHandler = () => {
    setReplyActive(false);
    setReplyText("");
  };

  const replyHandler = () => {
    if (!isAuthenticated) {
      dispatch(setAlert("You must be logged in to comment", AlertTypes.DANGER));
      navigate("/login");
      return;
    }
    dispatch(addReply(postId!, props.comment._id, replyText));
  };

  const reportHandler = () => {
    dispatch(
      setAlert(
        "This site does not have any moderation, oh well",
        AlertTypes.DANGER
      )
    );
  };

  const date = new Date(props.comment.createdAt);
  const dateString = dateFormat(date, "'Created' m/d/yy 'at' h:MMtt");

  return (
    <>
      <div className="mt-3">
        <div className="flex flex-row items-center gap-8 border-[3px]  border-secondary-orange bg-black p-3">
          <div className="flex flex-col items-center self-start">
            <h4 className="font-light tracking-wide opacity-80">
              {props.comment.user.username}
            </h4>
            <div className="w-16">
              <img src={`/img/planets/${favPlanet}.svg`} alt={favPlanet} />
            </div>
          </div>
          <div className="flex w-full flex-col justify-between gap-2 text-lg">
            <p className="text-xl">{props.comment.body}</p>
            <div className="mt-2 mr-4 flex justify-end gap-16">
              <p className="self-end text-sm opacity-70">{dateString}</p>
              <button
                className="font-light opacity-60"
                onClick={() => reportHandler()}
              >
                Report
              </button>
              <button
                className="text-secondary-orange"
                onClick={() => replyToggle()}
              >
                {replyActive ? "Hide" : "Reply"}
              </button>
            </div>
          </div>
        </div>
        {replyActive && (
          <div className="mt-2 mb-8">
            <textarea
              name="reply"
              placeholder="What are your thoughts?"
              value={replyText}
              onChange={(e) => replyTextChangeHandler(e)}
              className="w-full p-4 text-lg text-black opacity-80 placeholder:text-black placeholder:text-opacity-75"
            ></textarea>
            <div className=" flex flex-col-reverse justify-end gap-2 md:flex-row md:gap-24">
              <button
                className="p-2 text-2xl opacity-80"
                onClick={() => cancelReplyHandler()}
              >
                Cancel
              </button>
              <button
                className="bg-secondary-orange py-3 px-24 text-2xl"
                onClick={() => replyHandler()}
              >
                Reply
              </button>
            </div>
          </div>
        )}
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
