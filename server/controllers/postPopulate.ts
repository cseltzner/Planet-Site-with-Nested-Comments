export const postPopulate = {
  path: "comments",
  model: "comment",
  populate: {
    path: "childComments",
    model: "childcomment",
  },
};
