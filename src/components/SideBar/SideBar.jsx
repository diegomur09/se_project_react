import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "User";
  const avatar = currentUser?.avatar || "";
  const userInitial = userName.trim().charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      {avatar ? (
        <img src={avatar} alt={userName} className="sidebar__avatar" />
      ) : (
        <div className="sidebar__avatar-placeholder">{userInitial}</div>
      )}
      <div className="sidebar__info">
        <p className="sidebar__username">{userName}</p>
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfileClick}
        >
          Edit profile
        </button>
        <button
          type="button"
          className="sidebar__sign-out-btn"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
