import React, { useState, useEffect } from 'react';
import '../styles/PostList.css';
import { getPosts } from '../api/api';

// // 1) 데이터 하드코딩
// const testData = [
//     {
//         "id": 1,
//         "userId": 1,
//         "type": "free",
//         "title": "Test1입니다.",
//         "body": "Test1입니다.",
//         "open": "open",
//         "createdAt": "2023-08-29T09:22:18.7444354"
//     },
//     {
//         "id": 2,
//         "userId": 2,
//         "type": "free",
//         "title": "Test2입니다.",
//         "body": "Test2입니다.",
//         "open": "open",
//         "createdAt": "2023-08-29T09:22:18.7444354"
//     },
//     {
//         "id": 3,
//         "userId": 3,
//         "type": "free",
//         "title": "Test3입니다.",
//         "body": "Test3입니다.",
//         "open": "open",
//         "createdAt": "2023-08-29T09:22:18.7444354"
//     },
//     {
//         "id": 4,
//         "userId": 4,
//         "type": "free",
//         "title": "Test4입니다.",
//         "body": "Test4입니다.",
//         "open": "open",
//         "createdAt": "2023-08-29T09:22:18.7444354"
//     },
//     {
//         "id": 5,
//         "userId": 5,
//         "type": "free",
//         "title": "Test5입니다.",
//         "body": "Test5입니다.",
//         "open": "open",
//         "createdAt": "2023-08-29T09:22:18.7444354"
//     },
//     {
//         "id": 6,
//         "userId": 6,
//         "type": "free",
//         "title": "Test6입니다.",
//         "body": "Test6입니다.",
//         "open": "open",
//         "createdAt": "2023-08-29T09:22:18.7444354"
//     },
//     {
//       "id": 1,
//       "userId": 1,
//       "type": "free",
//       "title": "Test1입니다.",
//       "body": "Test1입니다.",
//       "open": "open",
//       "createdAt": "2023-08-29T09:22:18.7444354"
//   },
//   {
//       "id": 2,
//       "userId": 2,
//       "type": "free",
//       "title": "Test2입니다.",
//       "body": "Test2입니다.",
//       "open": "open",
//       "createdAt": "2023-08-29T09:22:18.7444354"
//   },
//   {
//       "id": 3,
//       "userId": 3,
//       "type": "free",
//       "title": "Test3입니다.",
//       "body": "Test3입니다.",
//       "open": "open",
//       "createdAt": "2023-08-29T09:22:18.7444354"
//   },
//   {
//       "id": 4,
//       "userId": 4,
//       "type": "free",
//       "title": "Test4입니다.",
//       "body": "Test4입니다.",
//       "open": "open",
//       "createdAt": "2023-08-29T09:22:18.7444354"
//   },
//   {
//       "id": 5,
//       "userId": 5,
//       "type": "free",
//       "title": "Test5입니다.",
//       "body": "Test5입니다.",
//       "open": "open",
//       "createdAt": "2023-08-29T09:22:18.7444354"
//   },
//   {
//       "id": 6,
//       "userId": 6,
//       "type": "free",
//       "title": "Test6입니다.",
//       "body": "Test6입니다.",
//       "open": "open",
//       "createdAt": "2023-08-29T09:22:18.7444354"
//   },
//   {
//     "id": 1,
//     "userId": 1,
//     "type": "free",
//     "title": "Test1입니다.",
//     "body": "Test1입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 2,
//     "userId": 2,
//     "type": "free",
//     "title": "Test2입니다.",
//     "body": "Test2입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 3,
//     "userId": 3,
//     "type": "free",
//     "title": "Test3입니다.",
//     "body": "Test3입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 4,
//     "userId": 4,
//     "type": "free",
//     "title": "Test4입니다.",
//     "body": "Test4입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 5,
//     "userId": 5,
//     "type": "free",
//     "title": "Test5입니다.",
//     "body": "Test5입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// },
// {
//     "id": 6,
//     "userId": 6,
//     "type": "free",
//     "title": "Test6입니다.",
//     "body": "Test6입니다.",
//     "open": "open",
//     "createdAt": "2023-08-29T09:22:18.7444354"
// }
// ];
// const PostList = () => {
//   const [visiblePosts, setVisiblePosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const initialPosts = testData.slice(0, 5);
//     setVisiblePosts(initialPosts);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + window.scrollY >=
//         document.body.offsetHeight - 100
//       ) {
//         const nextPage = currentPage + 1;
//         const startIndex = (nextPage - 1) * 5; // 5개씩 페이지당 표시
//         const endIndex = startIndex + 5;
//         const nextPosts = testData.slice(startIndex, endIndex);

//         if (nextPosts.length > 0) {
//           setVisiblePosts((prevPosts) => [...prevPosts, ...nextPosts]);
//           setCurrentPage(nextPage);
//         }
//       }
//     };
// window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [currentPage, isLoading]);

//     return (
//       <div className="post_list_container">
//         {visiblePosts.map((post) => (
//           <div className="post_item" key={post.id}>
//             <div className="post_header">
//               <div className="post_title">{post.title}</div>
//               <div className="post_date">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </div>
//             </div>
//             <div className="post_content">{post.body}</div>
//           </div>
//         ))}
//         {isLoading && <p>Loading...</p>}
//       </div>
//     );
//   };
  
//   export default PostList;


// 2) API axios사용
const PostList = () => {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 하여 초기데이터 5개 로딩
  useEffect(() => {
    // 초기 데이터 로딩
    getPosts(1)
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
  
            getPosts(nextPage)
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
              <div className="post_title">{post.title}</div>
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