import React, { useState } from "react";
import '../styles/PostEditer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { postPosts } from "api/api.js";
import axios from "axios";

function PostEditer() {
  const [formData, setFormData] = useState({
    type: 'free',
    title: '',
    body: '',
    file: null,
    open: 'open'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = () => {


    postPosts(formData.type, formData.title, formData.body, formData.file, formData.open, )
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