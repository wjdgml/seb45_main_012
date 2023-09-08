import '../styles/Button.css';
import '../components/PostList';
import PostList from '../components/PostList';
import NavBar from '../components/NavBar';

const FreeBoardPage = () => {
  <div><NavBar /></div>
  return (
  <>
      <div className='page_container'>
          
          <div>
            <button class="custom_board_button confirm_button">자유 게시판</button>
          </div>
          <div className='free_board_container'>
              <PostList/>
          </div>
      </div>
  </>
  )
}

export default FreeBoardPage;