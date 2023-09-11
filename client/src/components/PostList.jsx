import React, { useState, useEffect } from 'react';
import '../styles/PostList.css';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../api/api.js';

// 2) API axios사용
const PostList = () => {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 하여 초기데이터 5개 로딩
  useEffect(() => {
    // 초기 데이터 로딩
    getAllPosts(1)
      .then((res) => {
        const initialPosts = res.data.slice(0, 5);
        setVisiblePosts(initialPosts);
        setCurrentPage(1);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
        ) {
          if (!isLoading) {
            setIsLoading(true);
            const nextPage = currentPage + 1;
  
            getAllPosts(nextPage)
              .then((response) => {
                const data = response.data;
                if (data.length > 0) {
                  setVisiblePosts((prevPosts) => [...prevPosts, ...data]);
                  setCurrentPage(nextPage);
                }
                setIsLoading(false);
              })
              .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
              });
          }
        }
      };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, isLoading]);

    return (
      <div className="post_list_container">
        {visiblePosts.map((post) => (
          <div className="post_item" key={post.id}>
            <div className="post_header">
              <div className="post_title">
                <Link to={`/post/${post.id}`} className="post_title">{post.title}</Link>
              </div>
              <div className="post_date">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="post_content">{post.body}</div>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    );
  };
  
  export default PostList;