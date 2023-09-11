import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.78.145.37:8080', //기본 URL
  timeout: 5000,
});

export const getPosts = (page) => {
  return instance.get(`/post/free?page=${page}`);
};

export const postSignUp = (username, userId, password, password_question, password_answer) => {
  return instance.post('/user', {
    userId: userId,
    username: username,
    password: password,
    password_question: password_question,
    password_answer: password_answer
  });
}