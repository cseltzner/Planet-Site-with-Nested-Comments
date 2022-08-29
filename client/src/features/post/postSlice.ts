import { createSlice } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  user: string;
  title: string;
  body: string;
  planet: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

interface Comment {
  _id: string;
  user: string;
  body: string;
  parentPost: string;
  createdAt: Date;
  updatedAt: Date;
  childComments: ChildComment[];
}

interface ChildComment {
  _id: string;
  user: string;
  body: string;
  parentComment: string;
  createdAt: Date;
  updatedAt: Date;
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
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
    },
    getPost: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    addComment: (state, action) => {
      if (state.post !== null) {
        state.post.comments = [action.payload, ...state.post.comments];
      }
      state.loading = false;
    },
    removeComment: (state, action) => {
      if (state.post !== null) {
        state.post.comments = state.post.comments.filter(
          (comment) => comment._id !== action.payload
        );
      }
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
