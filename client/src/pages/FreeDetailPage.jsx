import '../styles/Button.css';
import '../styles/PostList.css';
import NavBar from '../components/NavBar';

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
          
          <div>
              <button class="custom_board_button cancel_button">자유 게시판</button>
          </div>
          
          <div className='free_detail_container'>
          <div className="post_header">
            <div className="post_title">{post.title}</div>
            <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
            
          <p>{user.userGrade} {user.username}</p>
          
          <p>{post.body}</p>
          </div>
      </div>
  </>
  )
}

export default FreeBoardPage;