// import React, { useState, useEffect } from 'react';
import '../styles/PostList.css';

const testData = [
    {
        "id": 1,
        "userId": 1,
        "type": "free",
        "title": "Test1입니다.",
        "body": "Test1입니다.",
        "open": "open",
        "createdAt": "2023-08-29T09:22:18.7444354"
    },
    {
        "id": 2,
        "userId": 2,
        "type": "free",
        "title": "Test2입니다.",
        "body": "Test2입니다.",
        "open": "open",
        "createdAt": "2023-08-29T09:22:18.7444354"
    },
    {
        "id": 3,
        "userId": 3,
        "type": "free",
        "title": "Test3입니다.",
        "body": "Test3입니다.",
        "open": "open",
        "createdAt": "2023-08-29T09:22:18.7444354"
    },
    {
        "id": 4,
        "userId": 4,
        "type": "free",
        "title": "Test4입니다.",
        "body": "Test4입니다.",
        "open": "open",
        "createdAt": "2023-08-29T09:22:18.7444354"
    },
    {
        "id": 5,
        "userId": 5,
        "type": "free",
        "title": "Test5입니다.",
        "body": "Test5입니다.",
        "open": "open",
        "createdAt": "2023-08-29T09:22:18.7444354"
    },
    {
        "id": 6,
        "userId": 6,
        "type": "free",
        "title": "Test6입니다.",
        "body": "Test6입니다.",
        "open": "open",
        "createdAt": "2023-08-29T09:22:18.7444354"
    }
];

const PostList = () => {
  
    return (
      <div className="post_list_container">
        {testData.map((post) => (
          <div className="post_item" key={post.id}>
            <div className="post_header">
              <div className="post_title">{post.title}</div>
              <div className="post_date">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="post_content">{post.body}</div>
          </div>
        ))}
        {/* {isLoading && <p>Loading...</p>} */}
      </div>
    );
  };
  
  export default PostList;