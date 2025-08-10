import "./ClotheSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClotheSection({ onCardClick, clothingItems = [], handleAddClick }) {
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
export default ClotheSection;
