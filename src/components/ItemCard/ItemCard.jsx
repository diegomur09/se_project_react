import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser?._id);
  const likes = Array.isArray(item.likes) ? item.likes : [];
  const isLiked = likes.some((id) => {
    const likeId = typeof id === "string" ? id : id?._id;
    return likeId === currentUser?._id;
  });

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!onCardLike) return;
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  } ${!isLoggedIn ? "card__like-button_hidden" : ""}`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button
          type="button"
          className={itemLikeButtonClassName}
          aria-label={isLiked ? "Remove like" : "Add like"}
          onClick={handleLike}
        />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
