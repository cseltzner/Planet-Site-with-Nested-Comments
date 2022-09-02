import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAlert } from "../../features/alert/alertActions";
import {
  addComment,
  deletePost,
  getPost,
  updatePost,
} from "../../features/post/postActions";
import { AlertTypes } from "../../util/alertTypes";
import Spinner from "../layout/Spinner";
import PostComments from "./PostComments";
import dateFormat from "dateformat";
import { planets } from "../../data/data";

const Post = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const { loading, post, error } = useAppSelector((state) => state.post);
  const { planet, postId } = useParams();
  const planetId = planets.indexOf(planet!) + 1;

  const [postText, setPostText] = useState("");
  const [editPostText, setEditPostText] = useState(post?.body);
  const [isEdit, setIsEdit] = useState(false);

  const isOwner = isAuthenticated && user?._id === post?.user._id;

  useEffect(() => {
    dispatch(getPost(postId!));
  }, []);

  // Correctly sets editPostText again once post is successfully updated
  useEffect(() => {
    setEditPostText(post?.body);
  }, [post?.body]);

  useEffect(() => {
    if (error.msg) {
      dispatch(setAlert(error.msg, AlertTypes.DANGER));
    }
  }, []);

  const postTextChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const editPostTextChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditPostText(e.target.value);
  };

  const submitCommentHandler = () => {
    if (!isAuthenticated) {
      dispatch(setAlert("You must be logged in to comment", AlertTypes.DANGER));
      navigate("/login");
      return;
    }
    // Post mode
    if (!isEdit) {
      if (!postText) {
        dispatch(setAlert("Post body cannot be empty", AlertTypes.DANGER));
        return;
      }
      dispatch(addComment(post?._id!, postText));
      setPostText("");
      setEditPostText(post?.body);
    }
    // Edit mode
    else {
      if (!editPostText) {
        dispatch(setAlert("Post body cannot be empty", AlertTypes.DANGER));
        return;
      }
      dispatch(updatePost(post?._id!, editPostText));
      setPostText("");
      setIsEdit(false);
    }
  };

  const onEditClicked = () => {
    setIsEdit(true);
    setPostText("");
  };

  const onEditCancel = () => {
    setIsEdit(false);
    setEditPostText(post?.body);
  };

  const onDeleteClicked = () => {
    dispatch(deletePost(postId!, planetId));
    navigate(`/planets/${planet}/discussion`);
  };

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
              {isOwner && (
                <div className="flex items-center gap-2 self-end">
                  {!isEdit ? (
                    <>
                      {/* Edit button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => onEditClicked()}
                        className="mt-2 h-10 w-10 cursor-pointer p-2 text-secondary-orange hover:rounded-full hover:bg-gray-900 hover:bg-opacity-50"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      {/* Cancel edit button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => onEditCancel()}
                        className="mt-2 h-10 w-10 cursor-pointer p-2 text-secondary-orange hover:rounded-full hover:bg-gray-900 hover:bg-opacity-50"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </>
                  )}
                  {/* Delete button */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={() => onDeleteClicked()}
                    className="mt-2 h-10 w-10 cursor-pointer rounded-full p-2 text-secondary-orange hover:bg-gray-900 hover:bg-opacity-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        <div className={`mt-8 flex flex-col items-center md:items-end`}>
          <textarea
            name="comment"
            placeholder={isEdit ? "" : "What are your thoughts?"}
            value={isEdit ? editPostText : postText}
            onChange={
              isEdit
                ? (e) => editPostTextChangeHandler(e)
                : (e) => postTextChangeHandler(e)
            }
            className={`${
              isEdit && "min-h-[400px]"
            } w-full p-4 text-lg text-black opacity-80 placeholder:text-black placeholder:text-opacity-75`}
          ></textarea>
          <button
            className="mt-4 w-full border border-white border-opacity-50 px-8 py-3 text-2xl hover:bg-white hover:bg-opacity-50 hover:text-primary-purple md:w-fit"
            onClick={() => submitCommentHandler()}
          >
            {isEdit ? "Update post" : "Submit"}
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
