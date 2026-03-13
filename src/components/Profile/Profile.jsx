import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleCardClick: onCardClick,
  clothingItems,
  handleAddClick,
  onEditProfileClick,
  onCardLike,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={onEditProfileClick}
          onSignOut={onSignOut}
        />
      </section>
      <section className="profile__clothe-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
