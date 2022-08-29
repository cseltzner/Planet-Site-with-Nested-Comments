import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts } from "../../features/post/postActions";
import PostListItem from "./PostListItem";

interface Props {
  planetId: number;
}

const Posts = (props: Props) => {
  const { posts, post, loading, error } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts(props.planetId));
  }, []);

  return (
    <div>
      {posts
        ? posts.map((post) => <PostListItem key={post._id} post={post} />)
        : "No posts"}
    </div>
  );
};

export default Posts;
