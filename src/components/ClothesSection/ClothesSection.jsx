import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems = [], handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes__section-header">
        <p className="clothe__section-header">Your Items</p>
        <button className="add__new-garment" onClick={handleAddClick}>
          {" "}
          + Add New{" "}
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((filteredItem) => {
          return (
            <ItemCard
              key={filteredItem._id}
              item={filteredItem}
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
