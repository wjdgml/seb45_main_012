import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import SignUpPage from './pages/SignUpPage.jsx';
import AllBoardPage from './pages/AllBoardPage.jsx';
import FreeBoardPage from './pages/FreeBoardPage.jsx';
import FreeDetailPage from './pages/FreeDetailPage.jsx';
// import Header from './components/header.jsx';
// import NavBar from './components/NavBar.jsx';
// import MyPageMain from 'pages/MyPageMain.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AllBoardPage/>} />
          <Route path="/free" element={<FreeBoardPage/>} />
          <Route path="/post/:postId/:userId" element={<FreeDetailPage />} />
        </Routes>
    </Router>
      {/* <FreeDetailPage/> */}
      {/* <SignUpPage /> */}
      {/* <Header /> */}
      {/* <NavBar /> */}
      {/* <FreeBoardPage/> */}
      {/* <MyPageMain /> */}
      {/* 기존: test */}
    </div>
  );
}

export default App;

// if (menuName === '전체 게시판') {
//   navigate('/');
// }
// if (menuName === '자유 게시판') {
//   navigate('/free');
// }
// if (menuName === '인증 게시판') {
//   navigate('/auth');
// }
// if (menuName === '환경 정보 게시판') {
//   navigate('/env');
// }
// if (menuName === '내가 쓴 글') {
//   navigate('/mypage/main');
// }
// if (menuName === '내 정보') {
//   navigate('/mypage/info');
// }