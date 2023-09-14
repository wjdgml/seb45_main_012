import '../styles/Button.css';
import '../components/PostList';
import AuthPostList from '../components/AuthPostList';

const AuthBoardPage = () => {

    return (
    <>
        <div className='page_container'>
            
            <div>
                <button class="custom_board_button confirm_button">인증 게시판</button>
                {/* <button class="custom_board_button cancel_button">인증 게시판</button> */}
            </div>
            <div className='auth_board_container'>
                <AuthPostList/>

            </div>
        </div>
    </>
    )
}

export default AuthBoardPage;