import React, { useState, useEffect } from 'react';
import '../styles/AuthPostList.css';
import { getAuthPosts } from '../api/api';

const AuthPostList = () => {
  const [allAuthPosts, setAllAuthPosts] = useState([]);
  const [visibleAuthPosts, setVisibleAuthPosts] = useState([]);
  
  useEffect(() => {
    getAuthPosts()
      .then((res)=> {
        const sortedData = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setAllAuthPosts(sortedData);
        setVisibleAuthPosts(sortedData.slice(0, 6));
        console.log(visibleAuthPosts);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="auth_post_list_container">
      <div className="auth_post_grid">
        {visibleAuthPosts.map((post, index) => (
          <div className="auth_post_item" key={post.postId}>
            <img src={post.imageUrls[0]} alt={`${post.postId}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthPostList;