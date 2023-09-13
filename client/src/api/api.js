import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.78.145.37:8080', //기본 URL
  timeout: 5000,
});

export const getAllPosts = () => {
  return instance.get(`/post/all`);
};

export const getAlltypePosts = (type_name) => {
  return instance.get(`/post/type/${type_name}`);
};

export const getPost = (postId) => {
  return instance.get(`/post/${postId}`);
};

export const deletePost = (userId, postId) => {
  return instance.delete(`/post/${userId}/${postId}`);
};

export const getUser = (userId) => {
  return instance.get(`/user/${userId}`);
};

export const getVote = (postId, voteId) => {
  return instance.get(`/vote/${postId}/${voteId}`);
};

// export const getComment = (postId, userId) => {
//   return instance.get(`/comment/${postId}/${userId}`);
// };

export const getComment = (postId, userId, page) => {
  return instance.get(`/comment/${postId}/${userId}`, {
    params: { page }
  });
};

export const postComment = (postId, userId, commentText) => {
  return instance.post(`/comment/${postId}/${userId}`, { body: commentText });
};