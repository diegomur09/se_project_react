import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/UseForm";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: "",
        avatar: "",
        email: "",
        password: "",
      });
      setError("");
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    onRegister(values)
      .then(() => {
        onClose?.();
        setValues({
          name: "",
          avatar: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        setError(err?.message || "Registration failed. Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      buttonText={submitting ? "Signing up..." : "Sign up"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          id="register-name"
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

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          id="register-avatar"
          name="avatar"
          type="url"
          className="modal__input"
          placeholder="Optional"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          id="register-email"
          name="email"
          type="email"
          className="modal__input"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          id="register-password"
          name="password"
          type="password"
          className="modal__input"
          required
          minLength="8"
          value={values.password}
          onChange={handleChange}
        />
      </label>

      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
