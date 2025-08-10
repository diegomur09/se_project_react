import { useState } from "react";
import "./ItemModal.css";
import closeButton from "../../assets/gray.svg";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const isOpen = activeModal === "preview";
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirmDelete = () => {
    if (card?._id) onDelete(card._id);
    setShowConfirm(false);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      {!showConfirm && (
        <div className="modal__content modal__content_type_image">
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
            aria-label="Close"
          >
            <img src={closeButton} alt="Close" className="modal__close-icon" />
          </button>

          <img
            src={card?.link || ""}
            alt={card?.name || "Item preview"}
            className="modal__image"
          />

          <div className="modal__footer">
            <div className="modal__details">
              <h2 className="modal__caption">{card?.name}</h2>
              <p className="modal__weather">Weather: {card?.weather}</p>
            </div>

            {card?._id && (
              <button
                type="button"
                className="modal__delete"
                onClick={handleDeleteClick}
                aria-label={`Delete ${card?.name || "item"}`}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="confirm" role="presentation" onClick={handleCancel}>
          <div
            className="confirm__content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCancel}
              type="button"
              className="confirm__close"
              aria-label="Close"
            >
              <img
                src={closeButton}
                alt="Close"
                className="confirm__close-icon"
              />
            </button>

            <h3 id="confirmTitle" className="confirm__title">
              Are you sure you want to delete this item?
            </h3>
            <p className="confirm__subtitle">This action is irreversible.</p>

            <div className="confirm__actions">
              <button
                type="button"
                className="confirm__delete"
                onClick={handleConfirmDelete}
              >
                Yes, delete item
              </button>
              <button
                type="button"
                className="confirm__cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemModal;
