import React, { useState, useEffect } from 'react';
import '../styles/Button.css';
import '../styles/MyPageMain.css'
import Pagination from 'components/Pagination.jsx';
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
  const [ currentPage, setCurrentPage ] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    setPosts(testData);
  }, []);

  const filteredPosts = posts.filter((post) => {
    if ( filter === 'all') return true;
    else if (filter === 'open') return post.open === true;
    else if (filter === 'private') return post.open === false;
  });

  const startPostIndex = ( currentPage - 1 ) * postsPerPage;
  const endPostIndex = Math.min(startPostIndex + postsPerPage);
  const currentPosts = filteredPosts.slice(startPostIndex, endPostIndex);

  const handleFilterChange = ( newFilter ) => {
    setFilter(newFilter);
    setCurrentPage(1); //필터 변경 시 페이지를 첫 번째 페이지로 초기화
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
        {currentPosts.map((post) => (
          <article className="post" key={post.id}>
            <div className='post_info'>
              <h4 className="post_title">{post.title}</h4>
              <div className='post_date'>{
                new Date(post.createdAt).toISOString().split("T")[0].replace(/-/g, '.')
              }</div>
            </div>
            <div className='post_content'>{post.body.slice(0, 50) + " ..."}</div>
          </article>
        ))}
        <Pagination
          posts={filteredPosts}
          postsPerPage={5}
          pagesPerGroup={5}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
        "title": "1",
        "body": "공개1",
        "open": true,
        "createdAt": "2023-08-29T09:22:18.7444354"
    },
    {
      "id": 2,
      "userId": 1,
      "type": "free",
      "title": "2입니다.",
      "body": "공개2입니다.",
      "open": true,
      "createdAt": "2023-08-29T09:22:18.7444354"
  },
  {
      "id": 3,
      "userId": 1,
      "type": "free",
      "title": "비공개1니다.",
      "body": "비공개1입니다.",
      "open": false,
      "createdAt": "2023-08-29T09:22:18.7444354"
  },
  {
    "id": 14,
    "userId": 1,
    "type": "free",
    "title": "비공개2입니다.",
    "body": "비공개2입니다.",
    "open": false,
    "createdAt": "2023-08-29T09:22:18.7444354"
},
{
    "id": 4,
    "userId": 1,
    "type": "free",
    "title": "공개3입니다.",
    "body": "공개3입니다.",
    "open": true,
    "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 5,
  "userId": 1,
  "type": "free",
  "title": "공개4입니다.",
  "body": "공개4입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 6,
  "userId": 1,
  "type": "free",
  "title": "공개5입니다.",
  "body": "공개5입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 7,
  "userId": 1,
  "type": "free",
  "title": "공개5.5입니다.",
  "body": "공개5.5입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 8,
  "userId": 1,
  "type": "free",
  "title": "공개6입니다.",
  "body": "공개6입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 9,
  "userId": 1,
  "type": "free",
  "title": "공개7입니다.",
  "body": "공개7입니다.",
  "open": true,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 10, 
  "userId": 1,
  "type": "free",
  "title": "비공개3입니다.",
  "body": "비공개3입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 11,
  "userId": 1,
  "type": "free",
  "title": "비공개4입니다.",
  "body": "비공개4입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 12,
  "userId": 1,
  "type": "free",
  "title": "비공개5입니다.",
  "body": "비공개5입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
},
{
  "id": 13,
  "userId": 1,
  "type": "free",
  "title": "비공개6입니다.",
  "body": "비공개6입니다.",
  "open": false,
  "createdAt": "2023-08-29T09:22:18.7444354"
}
];