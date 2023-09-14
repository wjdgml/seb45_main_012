import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.78.145.37:8080', //기본 URL
  timeout: 5000,
});

export const getFreePosts = (page) => {
  return instance.get(`/post/free?page=${page}`);
};

export const getAuthPosts = () => {
  return instance.get(`/post/type/auth`);
}