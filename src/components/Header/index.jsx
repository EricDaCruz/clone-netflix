import React from 'react';
import './Header.css'

const Header = ({black}) => {
    return ( 
        <header className={black ? "black" : ""}>
            <div className="header-logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt="Logo Netflix" />
                </a>
            </div>
            <div className="header-user">
                <a href="/user">
                    <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Usuário" />
                </a>
            </div>
        </header>
     );
}
 
export default Header;