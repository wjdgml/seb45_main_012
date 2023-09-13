import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Button.css';
import '../styles/FreeDetailPage.css';
import NavBar from '../components/NavBar.jsx';
import { getPost, getUser, getVote, getComment, postComment } from '../api/api.js';

const FreeDetailPage = () => {
  const { postId, userId } = useParams();

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [vote, setVote] = useState({});
  const [commentText, setCommentText] = useState('');

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  // 추가 데이터 가져오기 함수
  const loadMoreComments = () => {
    if (isLoading || !hasMoreData) {
      return;
    }

    setIsLoading(true);
    const nextPage = page + 1;

    getComment(postId, userId, nextPage)
    .then((response) => {
      if (response.data.length === 0) {
        // 더 이상 데이터가 없으면 무한 스크롤 중단
        setHasMoreData(false);
      } else {
        // 추가 데이터를 가져와서 표시
        setComments((prevComment) => [...prevComment, ...response.data]);
        setPage(nextPage);
      }
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('댓글 데이터 가져오기 오류:', error);
      setIsLoading(false);
    });
};

  const handleCommentTextChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= 500) {
      setCommentText(newText);
    } else {
      alert('댓글은 최대 500자까지 입력할 수 있습니다.');
    }
  };

  const handleSubmitComment = () => {
    console.log('댓글 내용:', commentText);

    postComment(postId, userId, commentText)
      .then((response) => {
        console.log('댓글 작성 완료:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('댓글 작성 오류:', error);
      });
  };


  useEffect(() => {
    // 포스트 데이터 가져오기
    getPost(postId)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('포스트 데이터 가져오기 오류:', error);
      });

    // 유저 데이터 가져오기
    getUser(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('유저 데이터 가져오기 오류:', error);
      });

    // 투표 데이터 가져오기
    getVote(postId, postId)
      .then((response) => {
        const voteData = response.data;
        const voteCount = voteData.voteCount;
        setVote(voteCount);
      })
      .catch((error) => {
        console.error('투표 데이터 가져오기 오류:', error);
      });

    // 댓글 데이터 가져오기
    getComment(postId, userId)
    .then((response) => {
      const reversedComments = response.data.reverse();
      setComments(reversedComments);
    })
    .catch((error) => {
      console.error('댓글 데이터 가져오기 오류:', error);
    });

    // Intersection Observer 초기화
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading && hasMoreData) {
        loadMoreComments();
      }
    });

    if (observerRef.current) {
      observerRef.current.observe(document.querySelector('.post_detail_content'));
    }
    return () => {
      // 컴포넌트가 언마운트될 때 Intersection Observer 해제
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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
              {comments.map((comment) => (
            <div key={comment.id} className='post_detail_header'>
              <div>
                <p>
                  {user.userGrade} {user.username}
                </p>
                <p>{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FreeDetailPage;