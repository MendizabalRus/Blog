export const getComments = (postId) => {
  return request(`/posts/${postId}/comments`);
};

export const postComments = (postId, content) => {
  return request(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(content),
  });
};

export const patchComment = (postId, commentId, content) => {
  return request(`/posts/${postId}/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(content),
  });
};

export const deleteComment = (postId, commentId) => {
  return request(`/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });
};