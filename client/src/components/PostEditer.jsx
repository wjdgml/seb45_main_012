import React from "react";
import '../styles/PostEditer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function PostEditer() {

  

  return (
    <>
      <div className="editer_wrapper wide">
        <button className="post_complete_btn wide">작성</button>
        <input type="text" className="post_title_input" placeholder="제목을 입력하세요"/>
        <textarea className='post_text_area' name="" id="" cols="30" rows="25" placeholder="내용을 입력하세요."></textarea>
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