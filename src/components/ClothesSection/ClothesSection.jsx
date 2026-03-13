import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems = [],
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => {
    const ownerId = typeof item.owner === "string" ? item.owner : item.owner?._id;
    return ownerId === currentUser?._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes__section-header">
        <p className="clothe__section-header">Your Items</p>
        <button className="add__new-garment" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
