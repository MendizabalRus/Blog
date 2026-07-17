export const getAllPosts = () => {
  return request(`/`);
};

export const getAllPublishedPosts = () => {
  return request(`/posts/published`);
};

export const getPost = (id) => {
  return request(`/posts/${postId}`);
};

export const createPost = (content) => {
  return request(`/create`, {
    method: "POST",
    body: JSON.stringify(content),
  });
};

export const patchPost = (postId, content) => {
  return request(`/posts/${postId}`, {
    method: "POST",
    body: JSON.stringify(content),
  });
};

export const deletePost = (id) => {
  return request(`/posts/${postId}`, {
    method: "DELETE",
  });
};
