import React, { useState } from 'react';
import '../styles/Button.css';
import '../styles/FreeDetailPage.css';
import NavBar from '../components/NavBar.jsx';
import { createComment } from '../api/api.js';

const FreeDetailPage = () => {

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

  const vote = {
    "id": 1,
    "postId": 1,
    "userId": 0,
    "voteType": null,
    "voteCount": 0
  }

  const comment = {
    "id": 1,
    "userId": 1,
    "postId": 3,
    "body": "test comment",
    "createdAt": "2023-08-29T14:43:27.8032943"
  }

  const [commentText, setCommentText] = useState('');

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = () => {
    console.log('댓글 내용:', commentText);

    createComment(post.id, user.userId, commentText)
      .then((response) => {
        console.log('댓글 작성 완료:', response.data);
      })
      .catch((error) => {
        console.error('댓글 작성 오류:', error);
      });
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
          <p className='post_detail_content'>❤️{vote.voteCount}</p>
          </div>
          <div className='free_detail_container'>
            <input
            className='comment_input'
              type="text"
              placeholder="내용을 입력해주세요."
              value={commentText}
              onChange={handleCommentTextChange}
            />
              <button className='comment_button' onClick={handleSubmitComment}>
                작성
              </button>
            <div className="post_detail_header">
              <div>
                <p>{user.userGrade} {user.username}</p>
                <p>댓글 내용이 여기에 들어갑니다. {comment.body}</p>
              </div>
              
            </div>
          </div>
      </div>
  </>
  )
}

export default FreeDetailPage;