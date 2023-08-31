import React, { useState } from "react";
import '../styles/SignUpForm.css';

function SignUpForm() {
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState("기억에 남는 추억의 장소는?");

  const handleDropdown = () => {
    setView(!view);
  }

  const handleSelectedMessagePlace = () => {
    setSelected(selected => '기억에 남는 추억의 장소는?');
  }

  const handleSelectedMessagePet = () => {
    setSelected(selected => '반려동물의 이름은?');
  }

  const handleSelectedMessageDate = () => {
    setSelected(selected => '추억하고 싶은 날짜가 있다면?');
  }



  return (
    <>
      <div className="signUp_wrapper">
        <div className="signUp_title">회원가입</div>
        <div className="signUp_form">

          <div className="name_input_area">&nbsp;이름 <br/>
          <input className="name_input"/>
          </div>

          <div className="id_input_area">&nbsp;아이디 <br/>
          <input className="id_input"/>
          </div>

          <div className="password_input_area">&nbsp;비밀번호 <br/>
          <input className="password_input"/>
          <div className="password_infomation">특수문자 1개 이상, 영문·숫자 포함 8글자 이상</div>
          </div>

          <div className="password_confirm">

            <div className="password_confirm_Q">
              <div className="password_confirm_Q_title">비밀번호 확인 질문</div>
              <div className="select_box" onClick={handleDropdown}>
              <div className="arrow_before" style={view ? {transform: 'rotate(-45deg)'} : {transform: 'rotate(45deg)'}}></div>
              <div className="arrow_after" style={view ? {transform: 'rotate(45deg)'} : {transform: 'rotate(-45deg)'}}></div>
              {selected}
              {view &&
                <ul>
                  <li onClick={handleSelectedMessagePlace}>기억에 남는 추억의 장소는?</li>
                  <li onClick={handleSelectedMessagePet}>반려동물의 이름은?</li>
                  <li onClick={handleSelectedMessageDate}>추억하고 싶은 날짜가 있다면?</li>
                </ul>
              }
              </div>
            </div>
           
            <div className="password_confirm_A">
              <div className="password_confirm_A_title">비밀번호 확인 답변</div>
              <input className="password_confirm_answer_input" placeholder="답변을 입력하세요"/>
            </div>

          </div>

          <div className="signup_complete">회원가입</div>

        </div>





      </div>
    
    </>  
  );
}

export default SignUpForm;