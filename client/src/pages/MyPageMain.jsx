import React, { useState, useEffect } from 'react';
import '../styles/Button.css';
import '../styles/MyPageMain.css'
// import Instance from '../axiosConfig';
// import jwtDecode from 'jwt-decode';

const MyPageMain = () => {
  // axios 요청 관련 로직 일단 주석 처리
  // const accessToken = localStorage.getItem('accessToken');
  // const decodedToken = jwtDecode(accessToken);
  // const memberId = accessToken.memberId;

  // const [ userData, setUserData ] = useState({});
  // const [ open, setOpen ] = useState(true);

  // useEffect(() => {
  //   async function getUserData() {
  //     try {
  //       const res = Instance.get('/post/' + memberId);
  //       setUserData(res.data);
  //     } catch (err) {
  //       console.log('error: ', err);
  //     }
  //   }

  //   getUserData();
  // }, []);
  
  //하드코딩

  const [ selectedButton, setSelectedButton ] = useState('전체');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName)
  }

  return (
    <main>
      <h6>내가 쓴 글</h6>
      <ul>
        <li>
          <button
            className={`custom_button ${selectedButton === '전체' ? 'active' : ''}`}
            onClick={() => handleButtonClick('전체')}
           >
            전체
          </button>
        </li>
        <li>
          <button
            className={`custom_button ${selectedButton === '공개' ? 'active' : ''}`}
            onClick={() => handleButtonClick('공개')}
            >
            공개
          </button>
        </li>
        <li>
          <button
            className={`custom_button ${selectedButton === '비공개' ? 'active' : ''}`}
            onClick={() => handleButtonClick('비공개')}
            >
            비공개
          </button>
        </li>
      </ul>
      <section>
      </section>
    </main>
  )
}

export default MyPageMain;




// // 1) 데이터 하드코딩
// const testData = [
//     {
//         "id": 1,
//         "userId": 1,
//         "type": "free",
//         "title": "Test1입니다.",
//         "body": "Test1입니다.",
//         "open": "open",
//         "createdAt": "2023-08-29T09:22:18.7444354"
//     },
    // {
    //     "id": 2,
    //     "userId": 2,
    //     "type": "free",
    //     "title": "Test2입니다.",
    //     "body": "Test2입니다.",
    //     "open": "open",
    //     "createdAt": "2023-08-29T09:22:18.7444354"
    // },
    // {
    //     "id": 3,
    //     "userId": 3,
    //     "type": "free",
    //     "title": "Test3입니다.",
    //     "body": "Test3입니다.",
    //     "open": "open",
    //     "createdAt": "2023-08-29T09:22:18.7444354"
    // },
    // {
    //     "id": 4,
    //     "userId": 4,
    //     "type": "free",
    //     "title": "Test4입니다.",
    //     "body": "Test4입니다.",
    //     "open": "open",
    //     "createdAt": "2023-08-29T09:22:18.7444354"
    // },
    // {
    //     "id": 5,
    //     "userId": 5,
    //     "type": "free",
    //     "title": "Test5입니다.",
    //     "body": "Test5입니다.",
    //     "open": "open",
    //     "createdAt": "2023-08-29T09:22:18.7444354"
    // },
    // {
    //     "id": 6,
    //     "userId": 6,
    //     "type": "free",
    //     "title": "Test6입니다.",
    //     "body": "Test6입니다.",
    //     "open": "open",
    //     "createdAt": "2023-08-29T09:22:18.7444354"
    // },
  //   {
  //     "id": 1,
  //     "userId": 1,
  //     "type": "free",
  //     "title": "Test1입니다.",
  //     "body": "Test1입니다.",
  //     "open": "open",
  //     "createdAt": "2023-08-29T09:22:18.7444354"
  // },
  // {
  //     "id": 1,
  //     "userId": 1,
  //     "type": "free",
  //     "title": "Test1입니다.",
  //     "body": "Test1입니다.",
  //     "open": "close",
  //     "createdAt": "2023-08-29T09:22:18.7444354"
  // },
  // {
  //     "id": 3,
  //     "userId": 3,
  //     "type": "free",
  //     "title": "Test3입니다.",
  //     "body": "Test3입니다.",
  //     "open": "open",
  //     "createdAt": "2023-08-29T09:22:18.7444354"
  // },
  // {
  //     "id": 4,
  //     "userId": 4,
  //     "type": "free",
  //     "title": "Test4입니다.",
  //     "body": "Test4입니다.",
  //     "open": "open",
  //     "createdAt": "2023-08-29T09:22:18.7444354"
  // },
  // {
  //     "id": 5,
  //     "userId": 5,
  //     "type": "free",
  //     "title": "Test5입니다.",
  //     "body": "Test5입니다.",
  //     "open": "open",
  //     "createdAt": "2023-08-29T09:22:18.7444354"
  // },
  // {
  //     "id": 6,
  //     "userId": 6,
  //     "type": "free",
  //     "title": "Test6입니다.",
  //     "body": "Test6입니다.",
  //     "open": "open",
  //     "createdAt": "2023-08-29T09:22:18.7444354"
  // },
//   {
//     "id": 1,
//     "userId": 1,
//     "type": "free",
//     "title": "Test1입니다.",
//     "body": "Test1입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 2,
//     "userId": 2,
//     "type": "free",
//     "title": "Test2입니다.",
//     "body": "Test2입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 1,
//     "userId": 1,
//     "type": "free",
//     "title": "Test3입니다.",
//     "body": "Test3입니다.",
//     "open": "close",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 4,
//     "userId": 4,
//     "type": "free",
//     "title": "Test4입니다.",
//     "body": "Test4입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 5,
//     "userId": 5,
//     "type": "free",
//     "title": "Test5입니다.",
//     "body": "Test5입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 6,
//     "userId": 6,
//     "type": "free",
//     "title": "Test6입니다.",
//     "body": "Test6입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// }
// ];