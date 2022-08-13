/**
 * Used in mongoose populate function to populate a post with comments and child comments.
 * Eg. Post.find().populate(postPopulate)
 */
export const postPopulate = {
  path: "comments",
  model: "comment",
  populate: {
    path: "childComments",
    model: "childcomment",
  },
};
