import axios from 'axios';

const instance = axios.create({
  baseURL: '', //기본 URL
  timeout: 5000,
});

export const getPosts = (page) => {
  return instance.get(`/post/free?page=${page}`);
};

