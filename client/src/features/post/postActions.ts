import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AlertTypes } from "../../util/alertTypes";
import { defaultHeaders } from "../../util/defaultHeaders";
import { Planets } from "../../util/planets";
import { setAlert } from "../alert/alertActions";
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

// Add Post
export const addPost =
  (title: string, body: string, planetId: number) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(postActions.setLoading());
      const data = {
        title: title,
        body: body,
      };
      const res = await axios.post(
        `/api/posts/${planetId}`,
        data,
        defaultHeaders
      );
      dispatch(postActions.addPost(res.data));
      dispatch(setAlert("Post created", AlertTypes.SUCCESS));
      dispatch(getPosts(planetId));
    } catch (error) {
      const err = error as AxiosError;

      dispatch(
        setAlert(
          "Failed to create post. Reason: " + err.response!.statusText,
          AlertTypes.DANGER
        )
      );

      dispatch(
        postActions.postError({
          msg: err.response!.statusText,
          status: err.response!.status,
        })
      );
    }
  };

// Add Comment
export const addComment =
  (postId: string, body: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(postActions.setLoading());

      const res = await axios.post(
        `/api/posts/comments/${postId}`,
        { body },
        defaultHeaders
      );
      dispatch(setAlert("Comment created", AlertTypes.SUCCESS));
      dispatch(getPost(postId));
    } catch (error) {
      const err = error as AxiosError;

      dispatch(
        setAlert(
          "Failed to create post. Reason: " + err.response!.statusText,
          AlertTypes.DANGER
        )
      );

      dispatch(
        postActions.postError({
          msg: err.response!.statusText,
          status: err.response!.status,
        })
      );
    }
  };

// Reply to comment
export const addReply =
  (postId: string, commentId: string, body: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(postActions.setLoading());

      const res = await axios.post(
        `/api/posts/comments/reply/${postId}/${commentId}`,
        { body },
        defaultHeaders
      );
      dispatch(setAlert("Reply created", AlertTypes.SUCCESS));
      dispatch(getPost(postId));
    } catch (error) {
      const err = error as AxiosError;

      dispatch(
        setAlert(
          "Failed to reply. Reason: " + err.response!.statusText,
          AlertTypes.DANGER
        )
      );

      dispatch(
        postActions.postError({
          msg: err.response!.statusText,
          status: err.response!.status,
        })
      );
    }
  };
