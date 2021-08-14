import TechChairIcon from "../icons/logo192.png";

const NavBar = () => {
    return (
        <nav className="navbar">
            <img src={TechChairIcon} width="55px" className="logo" alt="Logo Tech Chair"/>
            <h1>Tech Chair</h1>
            <div className="options">
                <a>Đăng nhập</a>
            </div>
        </nav>
    );
}

export default NavBar;