import "../styles/MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MainPage = () => {
    return (
        <>
            <div className="container">
                <div className="information_board">
                    <div className="board_container">
                        <div className='board left'>환경 관련 정보 </div>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                    <div className='content_container'>
                        <div className='content poster'>게시글 1</div>
                        <div className='content poster'>게시글 2</div>
                        <div className='content poster'>게시글 3</div>
                    </div>
                </div>
                <div className="second_row">
                    <div className='free_board'>
                        <div className="board_container">
                            <div className='board left'>자유 게시판</div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                        <div className='content_container'>
                            <div className='content title'>게시글 1</div>
                            <div className='content title'>게시글 2</div>
                            <div className='content title'>게시글 3</div>
                        </div>
                    </div>
                    <div className='photo_board'>
                        <div className="board_container">
                            <div className='board left'>인증 게시판</div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                        <div className='content_container'>
                            <div className='content photo'>게시글 1</div>
                            <div className='content photo'>게시글 2</div>
                            <div className='content photo'>게시글 3</div>
                        </div>
                    </div>
                </div>
                <div className='top_board'>
                    <div className='board_container'>인기 게시글</div>
                    <div className='content_container'>
                        <div className='content title'>게시글 1</div>
                        <div className='content title'>게시글 2</div>
                        <div className='content title'>게시글 3</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage;