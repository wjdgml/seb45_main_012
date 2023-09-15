import React, { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import '../styles/Button.css';
import '../styles/MyPageInfo.css';

const MyPageInfo = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setPreviewImageUrl(imageUrl);
        setSelectedImage(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageChangeClick = () => {
    // "이미지 변경" 버튼이 클릭되면 input[type="file"]를 클릭합니다.
    const imageInput = document.getElementById('imageInput');
    imageInput.click();
  };

  return (
    <>
      <div><NavBar /></div>
      <div className='page_container'>
        <h4>내 정보</h4>
        <div className='label_input_button_container'>
          <div className="circle_container">
            <input
              type="file"
              id="imageInput"
              className="circle_input"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div></div>
            <img
              src={previewImageUrl}
              alt=""
              className="circle_image"
            />
          </div>
          <div className="input_container">
            <input
              type="text"
              id="nicknameInput"
              className="nickname_input"
              placeholder="닉네임"
            />
          </div>
          <button className='custom_mypage_button confirm_button'>수정</button>
        </div>

        <div className='label_input_button_container'>
          
        </div>
      </div>
    </>
  );
  
};

export default MyPageInfo;
