import React from 'react';
import '../styles/Button.css';
import '../styles/FreeDetailPage.css';
import NavBar from '../components/NavBar.jsx';

const FreeBoardPage = () => {

  const post = {
    id: 1,
    userId: 0,
    type: "free",
    title: "Test입니다.",
    body: "Test입니다.",
    open: "open",
    createdAt: "2023-08-29T09:20:00.0014474"
  };

  const user = {
    "userId": "testID",
    "username": "test",
    "userStatus": "USER",
    "userGrade": "seed",
    "passwordQuestion": "Test Question",
    "createdAt": "2023-09-04T15:45:02.2870181"
  };

  return (
  <>
  <div><NavBar /></div>
  
      <div className='page_container'>
          
        <button className="custom_board_button cancel_button">자유 게시판</button>
          
          <div className='free_detail_container'>
          <div className="post_detail_header">
            <div>
              <h3 className="post_detail_title">{post.title}</h3>
              <p>{user.userGrade} {user.username}</p>
            </div>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          <p className='post_detail_content'>{post.body}</p>
          </div>
          <div className='free_detail_container'>
            test
          </div>
      </div>
  </>
  )
}

export default FreeBoardPage;