import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.78.145.37:8080', //기본 URL
  timeout: 5000,
});

export const getPosts = (page) => {
  return instance.get(`/post/free?page=${page}`);
};

export const postPosts = (type, title, body, file, open, user_id) => {
  return instance.post(`/post/${user_id}`, {
    type: type,
    title: title,
    body: body,
    file: file,
    open: open
  });
}

