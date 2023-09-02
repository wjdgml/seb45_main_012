import '../styles/Button.css';
// import '../styles/FreeBoardPage.css';
import '../components/PostList';
import PostList from '../components/PostList';

const FreeBoardPage = () => {

    return (
    <>
        <div className='page_container'>
            
            <div>
                <button class="custom_board_button confirm_button">자유 게시판</button>
                {/* <button class="custom_board_button cancel_button">자유 게시판</button> */}
            </div>
            <div className='free_board_container'>
                <PostList/>

            </div>
        </div>
    </>
    )
}

export default FreeBoardPage;