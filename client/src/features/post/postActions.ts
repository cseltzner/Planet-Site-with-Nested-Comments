import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Planets } from "../../util/planets";
import { postActions } from "./postSlice";

// Get posts
export const getPosts = (planet: Planets) => async (dispatch: Dispatch) => {
  try {
    dispatch(postActions.setLoading());
    const res = await axios.get(`/api/posts/${planet}`);
    dispatch(postActions.getPosts(res.data));
  } catch (error) {
    const err = error as AxiosError;

    dispatch(
      postActions.postError({
        msg: err.response!.statusText,
        status: err.response!.status,
      })
    );
  }
};

// Get post
export const getPost = (postId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(postActions.setLoading());
    const res = await axios.get(`/api/posts/post/${postId}`);
    dispatch(postActions.getPost(res.data));
  } catch (error) {
    const err = error as AxiosError;

    dispatch(
      postActions.postError({
        msg: err.response!.statusText,
        status: err.response!.status,
      })
    );
  }
};
