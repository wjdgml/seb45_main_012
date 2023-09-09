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

  const [ posts, setPosts ] = useState([]);
  const [ filter, setFilter ] = useState('all');

  useEffect(() => {
    setPosts(testData);
  }, []);

  const filteredPosts = posts.filter((post) => {
    if ( filter === 'all') return true;
    else if (filter === 'open') return post.open === true;
    else if (filter === 'private') return post.open === false;
  });

  const handleFilterChange = ( newFilter ) => {
    setFilter(newFilter);
  }

  const [ selectedButton, setSelectedButton ] = useState('전체');
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName)
  }

  return (
    <main className="container">
      <h2 className="my_posts">내가 쓴 글</h2>
      <ul>
        <li>
          <button
            className={`custom_button ${selectedButton === '전체' ? 'active' : ''}`}
            onClick={() => {
              handleButtonClick('전체');
              handleFilterChange('all');
            }}
            >
            전체
          </button>
        </li>
        <li>
          <button
            className={`custom_button ${selectedButton === '공개' ? 'active' : ''}`}
            onClick={() => {
              handleButtonClick('공개');
              handleFilterChange('open');
            }}
            >
            공개
          </button>
        </li>
        <li>
          <button
            className={`custom_button ${selectedButton === '비공개' ? 'active' : ''}`}
            onClick={() => {
              handleButtonClick('비공개')
              handleFilterChange('private');
            }}
            >
            비공개
          </button>
        </li>
      </ul>
      <section className='posts_container'>
        {filteredPosts.map((post) => (
          <article className="post" key={post.id}>
            <h4 className="post_title">{post.title}</h4>
            <div className='post_detail'>
              <span className='post_content'>{post.body.slice(0, 50) + " ..."}</span>
              <span className='post_date'>{
                new Date(post.createdAt).toISOString().split("T")[0].replace(/-/g, '.')
              }</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}


export default MyPageMain;




// // 1) 데이터 하드코딩
const testData = [
    {
        "id": 1,
        "userId": 1,
        "type": "free",
        "title": "Test1입니다.",
        "body": "Test1입니다.",
        "open": true,
        "createdAt": "2023-08-29T09:22:18.7444354"
    },
    {
      "id": 1,
      "userId": 1,
      "type": "free",
      "title": "Test1입니다.",
      "body": "Test1입니다.",
      "open": true,
      "createdAt": "2023-08-29T09:22:18.7444354"
  },
  {
      "id": 1,
      "userId": 1,
      "type": "free",
      "title": "Test1입니다.",
      "body": "Test1입니다.",
      "open": false,
      "createdAt": "2023-08-29T09:22:18.7444354"
  },
  {
    "id": 1,
    "userId": 1,
    "type": "free",
    "title": "Test1입니다.",
    "body": "Test1입니다.",
    "open": false,
    "createdAt": "2023-08-29T09:22:18.7444354"
},
{
    "id": 1,
    "userId": 1,
    "type": "free",
    "title": "Test3입니다.",
    "body": "Test3입니다.",
    "open": true,
    "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test4입니다.",
  "body": "Test4입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 1,
  "userId": 1,
  "type": "free",
  "title": "Test3입니다.",
  "body": "Test3입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
}
];