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
        <h3>내 정보</h3>
        <button
          className='custom_button confirm_button'
          onClick={handleImageChangeClick} // 이미지 변경 버튼 클릭 시 이미지 변경 동작 수행
        >
          이미지 변경
        </button>
        <div className="circle_container">
          <label htmlFor="imageInput" className="circle_label">
            <input
              type="file"
              id="imageInput"
              className="circle_input"
              accept="image/*"
              onChange={handleImageChange}
            />
            </label>
            <img
              src={previewImageUrl}
              alt="기본 이미지"
              className="circle_image"
            />
          
        </div>
      </div>
    </>
  );
};

export default MyPageInfo;
