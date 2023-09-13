import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.78.145.37:8080', //기본 URL
  timeout: 5000,
});

export const getPosts = (page) => {
  return instance.get(`/post/free?page=${page}`);
};

export const postSignUp = (username, userId, password, password_question, password_answer) => {
  const formData = new FormData();

  // 이미지 파일을 "image" 필드에 추가
  formData.append('image', null);

  // 나머지 데이터를 JSON 형태의 문자열로 만들어 "data" 필드에 추가
  const jsonData = {
    userUseId: userId,
    userName: username,
    password: password,
    passwordQuestion: password_question,
    passwordAnswer: password_answer
  };

  formData.append('json', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

  // Axios 요청
  return instance.post('/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}





