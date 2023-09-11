import React, { useState } from "react";
import '../styles/PostEditer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { postPosts } from "api/api.js";
import axios from "axios";

function PostEditer() {
  const [formData, setFormData] = useState({
    type: 'justTextBoard',
    title: '',
    body: '',
    file: null,
    open: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = () => {
    axios.get('http://52.78.145.37:8080/user')
      .then((resp) => {
        let userId = resp.data.userId;
        return postPosts(formData.type, formData.title, formData.body, formData.file, formData.open, userId)
        .then((response) => {
          console.log('성공!!', response.data);
        })
        .catch((err) => {
          console.error('실패!!...', err);
        });
      })
      .catch((error) => {
        console.error('실패.....ㅠㅠ', error);
      })
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

  

  return (
    <div className="post_editer_with_image">

      <div className="image_upload_form">
        <FontAwesomeIcon className='plus_icon' icon={faPlus}/>이미지
      </div>

      <div className="editer_wrapper">
        <button className="post_complete_btn">작성</button>
        <input type="text" className="post_title_input" placeholder="제목을 입력하세요"/>
        <textarea className='post_text_area' name="" id="" cols="30" rows="25" placeholder="내용을 입력하세요."></textarea>
      </div>
    
    </div>
  );
}

export { PostEditerWithImage, PostEditer };