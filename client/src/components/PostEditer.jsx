import React, { useState, useRef } from "react";
import '../styles/PostEditer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { postPosts } from "api/api.js";

function PostEditer() {
  const [formData, setFormData] = useState({
    type: 'free',
    title: '',
    body: '',
    open: 'true'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = () => {
    postPosts(formData.type, formData.title, formData.body, formData.open)
    .then((resp) => {
      console.log('성공~!!', resp.data);
    })
    .catch((err) => {
      console.error('실패ㅠㅠ', err);
    });
  }

  return (
    <>
      <div className="editer_wrapper wide">
        <button onClick={handleCreatePost} className="post_complete_btn wide">작성</button>
        <input onChange={handleInputChange} name='title' value={formData.title} type="text" className="post_title_input" placeholder="제목을 입력하세요"/>
        <textarea onChange={handleInputChange} name='body' value={formData.body} className='post_text_area' placeholder="내용을 입력하세요."></textarea>
      </div>
    </>
  );
}

function PostEditerWithImage() {
  const [formData, setFormData] = useState({
    type: 'auth',
    title: '',
    body: '',
    open: 'true'
  });
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일의 첫 번째 파일을 가져옴
    setFormData({ ...formData, file });

      // 이미지 파일을 읽기
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // 읽은 이미지 데이터를 사용하여 미리보기 업데이트
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      e.target.value = null;
    } 
  };

  const handleImageClick = () => {
    // 이미지를 클릭하면 input 필드 클릭 시도
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = () => {
    postPosts(formData.type, formData.title, formData.body, formData.open, previewImage)
    .then((resp) => {
      console.log('성공~!!!!!', resp.data);
    })
    .catch((err) => {
      console.error('실패ㅠㅠ', err);
    });
  }
  

  return (
    <div className="post_editer_with_image">

      <div className="image_upload_form" >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          ref={imageInputRef}
        />
        {previewImage && <img src={previewImage} alt="미리보기" onClick={handleImageClick} aria-hidden="true" />}
        {/* {console.log(previewImage)} */}
        <div className={`plus_image_icon ${previewImage ? 'clear' : ''}`} >
          <FontAwesomeIcon className='plus_icon' icon={faPlus}/>이미지
        </div>
      </div>

      <div className="editer_wrapper">
      <button onClick={handleCreatePost} className="post_complete_btn wide">작성</button>
        <input onChange={handleInputChange} name='title' value={formData.title} type="text" className="post_title_input" placeholder="제목을 입력하세요"/>
        <textarea onChange={handleInputChange} name='body' value={formData.body} className='post_text_area' placeholder="내용을 입력하세요."></textarea>
      </div>
    
    </div>
  );
}

export { PostEditerWithImage, PostEditer };