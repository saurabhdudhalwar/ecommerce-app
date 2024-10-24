import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="Logo" className="header__logo-image" />
          <span className="header__website-name">ShopNest</span>
        </div>

        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <button className="header__toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
