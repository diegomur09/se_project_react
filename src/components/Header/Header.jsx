import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "User";
  const avatar = currentUser?.avatar || "";
  const userInitial = userName.trim().charAt(0).toUpperCase();

  return (
    <header className="header">
      <span className="header__left-section">
        <Link to="/">
          <img src={logo} alt="Weather Closet logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </span>

      <span className="header__right-section">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{userName}</p>

                {avatar ? (
                  <img src={avatar} alt={userName} className="header__avatar" />
                ) : (
                  <div className="header__avatar-placeholder">
                    {userInitial}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onLoginClick}
            >
              Log in
            </button>
          </>
        )}
      </span>
    </header>
  );
}

export default Header;
