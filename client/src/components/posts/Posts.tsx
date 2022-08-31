import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPost, getPosts } from "../../features/post/postActions";
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
  const [formData, setFormData] = useState({ title: "", body: "" });

  const toggleCreatingPost = () => {
    if (!isAuthenticated) {
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
          {posts.length > 0 ? (
            posts.map((post) => <PostListItem key={post._id} post={post} />)
          ) : (
            <>
              <p className="text-2xl">No posts yet!</p>
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
