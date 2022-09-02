import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAlert } from "../../features/alert/alertActions";
import { addComment, getPost } from "../../features/post/postActions";
import { AlertTypes } from "../../util/alertTypes";
import Spinner from "../layout/Spinner";
import PostComments from "./PostComments";
import dateFormat from "dateformat";

const Post = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { loading, post, error } = useAppSelector((state) => state.post);
  const { planet, postId } = useParams();

  const [postText, setPostText] = useState("");

  useEffect(() => {
    dispatch(getPost(postId!));
  }, []);

  useEffect(() => {
    if (error.msg) {
      dispatch(setAlert(error.msg, AlertTypes.DANGER));
    }
  }, []);

  const postTextChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const submitCommentHandler = () => {
    if (!isAuthenticated) {
      dispatch(setAlert("You must be logged in to comment", AlertTypes.DANGER));
      navigate("/login");
      return;
    }
    if (!postText) {
      dispatch(setAlert("Post body cannot be empty", AlertTypes.DANGER));
      return;
    }
    dispatch(addComment(post?._id!, postText));
    setPostText("");
  };

  console.log(post?.createdAt);
  const date = new Date(post?.createdAt!);
  const dateString = post && dateFormat(date, "m/d/yy 'at' h:MMtt");
  return (
    <>
      <div className="flex flex-col p-4 text-white sm:p-12 lg:px-24">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-24">
          <div className="flex flex-col items-center self-start">
            <h1 className="text-2xl underline opacity-90 md:text-7xl md:no-underline lg:text-8xl">
              {planet}
            </h1>
            <div>
              <img
                src={`/img/planets/${planet}.svg`}
                alt={`${planet}`}
                className="md:w-sm hidden max-w-sm md:block md:w-52 lg:w-72"
              />
            </div>
          </div>
          {post ? (
            <div className="flex flex-col">
              <h2 className="text-5xl tracking-tight opacity-95">
                {post?.title}
              </h2>
              <h3 className="mt-2 text-white opacity-70">
                By <span className="underline">{post?.user.username}</span> on{" "}
                {dateString}
              </h3>

              <p className="mt-8 text-xl font-light leading-7 tracking-wide opacity-90">
                {post?.body}
              </p>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="mt-8 flex flex-col items-center md:items-end">
          <textarea
            name="comment"
            placeholder="What are your thoughts?"
            value={postText}
            onChange={(e) => postTextChangeHandler(e)}
            className="w-full p-4 text-lg text-black opacity-80 placeholder:text-black placeholder:text-opacity-75"
          ></textarea>
          <button
            className="mt-4 w-full border border-white border-opacity-50 px-8 py-3 text-2xl hover:bg-white hover:bg-opacity-50 hover:text-primary-purple md:w-fit"
            onClick={() => submitCommentHandler()}
          >
            Submit
          </button>
        </div>

        <div className="mt-4"></div>
        {/* Comments section */}

        {/* Spinner when loading */}
        {loading && (
          <div className="mt-8 self-center">
            <Spinner />
          </div>
        )}
        {/* PostComments when comments exist */}
        {!loading && post?.comments && post?.comments.length > 0 && (
          <PostComments comments={post!.comments} />
        )}
        {/* No comments template */}
        {!loading &&
          post?.comments &&
          post?.comments.length < 1 &&
          "No comments yet..."}
      </div>
    </>
  );
};

export default Post;
