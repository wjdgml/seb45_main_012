import React from 'react';
import '../styles/Button.css';
import NavBar from '../components/NavBar.jsx';

const MyPageInfo = () => {
  return (
  <>
    <div><NavBar /></div>
      <div className='page_container'>
          
      <button className="custom_board_button confirm_button">내 정보</button>

      </div>
  </>
  )
}

export default MyPageInfo;