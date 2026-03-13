import { useContext } from "react";
import "./ItemModal.css";
import closeButton from "../../assets/gray.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const ownerId = typeof card?.owner === "string" ? card.owner : card?.owner?._id;
  const isOwn = ownerId === currentUser?._id;

  const handleDelete = () => {
    if (!card?._id) return;
    onDelete(card._id);
  };

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="Close" className="modal__close-icon" />
        </button>

        <img
          src={card?.link || ""}
          alt={card?.name || "Clothing item"}
          className="modal__image"
        />

        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card?.name || ""}</h2>
            <p className="modal__weather">Weather: {card?.weather || ""}</p>
          </div>

          {isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={handleDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
