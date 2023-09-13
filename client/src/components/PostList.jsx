import React, { useState, useEffect } from 'react';
import '../styles/PostList.css';
import { Link } from 'react-router-dom';
import { getAllPosts, getAlltypePosts } from '../api/api.js';
import PropTypes from 'prop-types';

const PostList = (props) => {
  const [allPosts, setAllPosts] = useState([]); 
  const [visiblePosts, setVisiblePosts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.type === 'all') {
      getAllPosts()
        .then((res) => {
          console.log(res);
          const sortedData = res.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setAllPosts(sortedData);
          setVisiblePosts(sortedData.slice(0, 10));
        })
        .catch((error) => console.error('Error:', error));
    } else {
      getAlltypePosts(props.type)
        .then((res) => {
          console.log(res);
          const sortedData = res.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setAllPosts(sortedData);
          setVisiblePosts(sortedData.slice(0, 10));
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [props.type]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      const nextPage = currentPage + 1;
      const endIndex = nextPage * 5; // 페이지당 5개의 데이터 보여주기
      if (endIndex <= allPosts.length) {
        setLoading(true); 
        setTimeout(() => {
          setVisiblePosts(allPosts.slice(0, endIndex));
          setCurrentPage(nextPage);
          setLoading(false);
        }, 1000); 
      }
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

    return (
      <div className="post_list_container">
        {visiblePosts.map((post) => (
          <div className="post_item" key={post.postId}>
            <div className="post_header">

              <Link to={`/post/${post.postId}/${post.userId}`} className="post_title">{post.title}</Link>
              <div className="post_date">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="post_content">{post.body}</div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      {currentPage * 5 < allPosts.length && !loading && (
        <div>Loading more...</div>
      )}
      </div>
    );
  };
  
  PostList.propTypes = {
    type: PropTypes.string.isRequired,
  };

  export default PostList;