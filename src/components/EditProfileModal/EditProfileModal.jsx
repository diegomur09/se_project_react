import React, { useEffect, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hook/UseForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
      setError("");
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    onUpdateUser(values)
      .then(() => onClose?.())
      .catch((err) => {
        setError(err?.message || "Failed to update profile.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      buttonText={submitting ? "Saving..." : "Save changes"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name
        <input
          id="edit-profile-name"
          name="name"
          type="text"
          className="modal__input"
          required
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar URL
        <input
          id="edit-profile-avatar"
          name="avatar"
          type="url"
          className="modal__input"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default EditProfileModal;
