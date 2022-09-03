import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAlert } from "../../features/alert/alertActions";
import { addLike, removeLike } from "../../features/post/postActions";
import { Post } from "../../features/post/postSlice";
import { AlertTypes } from "../../util/alertTypes";

interface Props {
  post: Post;
}

const PostListItem = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { planet } = useParams();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const post = props.post;
  const numLikes = post.likes.length;
  const isLiked = post.likes.find((like) => like.user === userId);

  const commentTotal = post.comments.flat().length;

  const urlToPost = `/planets/${planet}/discussion/${post._id}`;

  const likeHandler = () => {
    if (!isAuthenticated) {
      navigate("/login");
      dispatch(
        setAlert("You must be logged in to like posts", AlertTypes.DANGER)
      );
      return;
    }

    // Check if already liked
    if (isLiked) {
      dispatch(removeLike(post._id));
    } else {
      dispatch(addLike(post._id));
    }
  };

  return (
    <>
      <div className="flex min-w-[300px] max-w-3xl border-collapse flex-row gap-8 border border-white border-opacity-50 py-3 px-6">
        <button
          onClick={() => likeHandler()}
          className="flex cursor-pointer flex-col items-center"
        >
          <div
            className={`${
              isLiked ? "text-secondary-orange brightness-125" : "opacity-90"
            }`}
          >
            {numLikes}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${
              isLiked
                ? "fill-secondary-orange text-secondary-orange"
                : "opacity-90"
            } h-6 w-6`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.9 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </button>
        <div className="flex grow flex-col">
          <Link to={urlToPost}>
            <h2 className="cursor-pointer text-xl tracking-wide hover:underline">
              {post.title}
            </h2>
          </Link>
          <div className="flex flex-row justify-between">
            <p className="font-thin tracking-wide opacity-75">
              {post.user.username}
            </p>
            <Link to={urlToPost}>
              <p
                className={`cursor-pointer font-light tracking-wide hover:underline ${
                  commentTotal > 0
                    ? "text-secondary-orange opacity-100"
                    : "opacity-75"
                }`}
              >
                {commentTotal} {commentTotal === 1 ? "comment" : "comments"}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostListItem;
