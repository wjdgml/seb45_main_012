import React, { useState, useEffect } from 'react';
import '../styles/Button.css';
import '../styles/MyPageMain.css';
import axios from 'axios';
import Pagination from 'components/Pagination.jsx';
import jwtDecode from 'jwt-decode';

const MyPageMain = () => {
  // const accessToken = localStorage.getItem('accessToken');
  // const decodedToken = jwtDecode(accessToken);
  // const memberId = decodedToken.memberId;

  const [ userData, setUserData ] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get('http://52.78.145.37:8080/post/customer/10');
        setUserData(res.data);
      } catch (err) {
        console.log('error: ', err);
      }
    }

    getUserData();
  }, []);

  const [ filter, setFilter ] = useState('all');
  const [ currentPage, setCurrentPage ] = useState(1);
  const postsPerPage = 5;

  const filteredPosts = userData.filter((post) => {
    if ( filter === 'all') return ( post.open === "true" || post.open === "false");
    else if (filter === 'open') return post.open === "true";
    else if (filter === 'private') return post.open === "false";
  });

  const startPostIndex = ( currentPage - 1 ) * postsPerPage;
  const endPostIndex = Math.min(startPostIndex + postsPerPage);
  const currentPosts = filteredPosts.slice(startPostIndex, endPostIndex);

  const handleFilterChange = ( newFilter ) => {
    setFilter(newFilter);
    setCurrentPage(1);
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
          postsPerPage={postsPerPage}
          pagesPerGroup={5}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </main>
  )
}


export default MyPageMain;