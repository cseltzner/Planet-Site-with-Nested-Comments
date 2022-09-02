import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  title: string;
  body: string;
  planet: number;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  user: User;
  body: string;
  parentPost: string;
  createdAt: string;
  updatedAt: string;
  childComments: ChildComment[];
}

export interface ChildComment {
  _id: string;
  user: User;
  body: string;
  parentComment: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  favPlanet: number;
}

export interface PostInterface {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: { msg: string; status: number };
}

const initialState: PostInterface = {
  posts: [],
  post: null,
  loading: false,
  error: { msg: "", status: 0 },
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    getPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    postError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateLikes: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? { ...post, likes: action.payload.likes }
          : post
      );
      state.loading = false;
    },
    deletePost: (state, action) => {
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    updatePost: (state) => {
      state.loading = false;
    },
    getPost: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    addComment: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    deleteComment: (state) => {
      state.loading = false;
    },
    addReply: (state, action) => {
      if (state.post !== null) {
        const parentComment = state.post.comments.find(
          (comment) => comment._id == action.payload._id
        );
        if (parentComment && parentComment.childComments) {
          parentComment.childComments = [
            action.payload.childComment,
            ...parentComment.childComments,
          ];
        }
      }
      state.loading = false;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
