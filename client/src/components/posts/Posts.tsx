import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAlert } from "../../features/alert/alertActions";
import { addPost, getPosts } from "../../features/post/postActions";
import { AlertTypes } from "../../util/alertTypes";
import Spinner from "../layout/Spinner";
import PostListItem from "./PostListItem";

interface Props {
  planetId: number;
}

const Posts = (props: Props) => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { posts, post, loading, error } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const [creatingPost, setCreatingPost] = useState(false);

  const initialFormState = { title: "", body: "" };
  const [formData, setFormData] = useState(initialFormState);

  const toggleCreatingPost = () => {
    if (!isAuthenticated) {
      dispatch(setAlert("You must be logged in to post", AlertTypes.DANGER));
      navigate("/login");
      return;
    }
    setCreatingPost((prevState) => !prevState);
  };

  const formChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const postSubmitHandler = () => {
    dispatch(addPost(formData.title, formData.body, props.planetId));
    setFormData(initialFormState);
    setCreatingPost(false);
  };

  useEffect(() => {
    dispatch(getPosts(props.planetId));
  }, []);

  return (
    <>
      {loading && (
        <div className="self-center">
          <Spinner tailwindSize={"w-24 h-24"} />
        </div>
      )}
      {!loading && (
        <div className="grow">
          {posts && posts.constructor === Array && posts.length > 0 ? (
            posts.map((post) => <PostListItem key={post._id} post={post} />)
          ) : (
            <>
              <p className="text-2xl">No posts found!</p>
              <button
                className="py-2 text-xl text-secondary-orange"
                onClick={() => navigate(0)}
              >
                Refresh
              </button>
            </>
          )}
          <div>
            <button
              onClick={() => toggleCreatingPost()}
              className={`mt-4 inline-block ${
                !creatingPost && "bg-secondary-orange px-24"
              }  py-3 text-2xl hover:opacity-95 lg:mt-12`}
            >
              {creatingPost ? "Hide" : "Create Post"}
            </button>
            {/* If creatingPost is true */}
            {creatingPost && (
              <>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="Post Title..."
                    className="bg-white bg-opacity-75 p-3 text-xl text-black placeholder:text-black placeholder:text-opacity-70"
                    value={formData.title}
                    onChange={(e) => formChangeHandler(e)}
                  />
                  <textarea
                    name="body"
                    placeholder="What are your thoughts?"
                    className="bg-white bg-opacity-75 p-3  text-xl text-black placeholder:text-black placeholder:text-opacity-70"
                    value={formData.body}
                    onChange={(e) => formChangeHandler(e)}
                  ></textarea>
                  <button
                    onClick={() => postSubmitHandler()}
                    className="mt-4 inline-block 
            bg-secondary-orange px-24
            py-3 text-2xl hover:opacity-95 lg:mt-12"
                  >
                    Submit Post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
