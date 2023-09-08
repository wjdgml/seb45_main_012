import React from 'react';
import './App.css';
// import SignUpPage from './pages/SignUpPage.jsx';
import FreeDetailPage from './pages/FreeDetailPage.jsx';
// import Header from './components/header.jsx';
// import NavBar from './components/NavBar.jsx';
import MyPageMain from 'pages/MyPageMain.jsx';

function App() {
  return (
    <div className="App">
      <FreeDetailPage/>
      {/* <SignUpPage /> */}
      {/* <Header /> */}
      {/* <NavBar /> */}
      {/* <FreeBoardPage/> */}
      <MyPageMain />
      {/* 기존: test */}
    </div>
  );
}

export default App;
