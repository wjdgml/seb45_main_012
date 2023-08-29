import "../styles/components/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

    // 로그인 여부에 따라 달라지는 상태
    

    return (
        <div className="header_container">
            <img src={require("../assets/logo.png")} alt="logo" />
            <FontAwesomeIcon icon={faPencil} />
        </div>
    )
}

export default Header;