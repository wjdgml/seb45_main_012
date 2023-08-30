import React, { useState } from "react";
import '../styles/SignUp.css';

function SignUp() {
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
      <div className="signUp-wrapper">
        <div className="signUp-title">회원가입</div>
        <div className="signUp-form">

          <div className="name-input-area">&nbsp;이름 <br/>
          <input className="name-input"/>
          </div>

          <div className="id-input-area">&nbsp;아이디 <br/>
          <input className="id-input"/>
          </div>

          <div className="password-input-area">&nbsp;비밀번호 <br/>
          <input className="password-input"/>
          <div className="password-infomation">특수문자 1개 이상, 영문·숫자 포함 8글자 이상</div>
          </div>

          <div className="password-confirm">

            <div className="password-confirm-Q">
              <div className="password-confirm-Q-title">비밀번호 확인 질문</div>
              <div className="select-box" onClick={handleDropdown}>
              <div className="arrow-before" style={view ? {transform: 'rotate(-45deg)'} : {transform: 'rotate(45deg)'}}></div>
              <div className="arrow-after" style={view ? {transform: 'rotate(45deg)'} : {transform: 'rotate(-45deg)'}}></div>
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
           
            <div className="password-confirm-A">
              <div className="password-confirm-A-title">비밀번호 확인 답변</div>
              <input className="password-confirm-answer-input" placeholder="답변을 입력하세요"/>
            </div>

          </div>

          <div className="signup-complete">회원가입</div>

        </div>





      </div>
    
    </>  
  );
}

export default SignUp;