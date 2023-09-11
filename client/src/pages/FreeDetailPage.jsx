import React, { useState, useEffect } from 'react';
import '../styles/Button.css';
import '../styles/FreeDetailPage.css';
import NavBar from '../components/NavBar.jsx';
import { getPost, getUser, getVote, getComment, postComment } from '../api/api.js';

const FreeDetailPage = () => {

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [vote, setVote] = useState({});
  const [comment, setComment] = useState({});
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // 포스트 데이터 가져오기
    getPost(1)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('포스트 데이터 가져오기 오류:', error);
      });

    // 유저 데이터 가져오기
    getUser('testID')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('유저 데이터 가져오기 오류:', error);
      });

    // 투표 데이터 가져오기
    getVote(1, 1)
      .then((response) => {
        setVote(response.data);
      })
      .catch((error) => {
        console.error('투표 데이터 가져오기 오류:', error);
      });

    // 댓글 데이터 가져오기
    getComment(3, 1)
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.error('댓글 데이터 가져오기 오류:', error);
      });
  }, []);

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = () => {
    console.log('댓글 내용:', commentText);

    postComment(post.id, user.userId, commentText)
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