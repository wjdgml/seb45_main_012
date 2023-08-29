import "../styles/components/header.css";

const Header = () => {

    // 로그인 여부에 따라 달라지는 상태
    

    return (
        <div className="header_container">
            <img src={require("../assets/logo.png")} alt="logo" />

        </div>
    )
}

export default Header;