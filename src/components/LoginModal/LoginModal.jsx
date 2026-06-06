import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hook/UseForm";

function LoginModal({ isOpen, onClose, onLogin }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
      setError("");
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    onLogin(values)
      .then(() => {
        onClose?.();
        setValues({ email: "", password: "" });
      })
      .catch((err) => {
        setError(err?.message || "Login failed. Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      buttonText={submitting ? "Logging in..." : "Log in"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
          name="email"
          type="email"
          className="modal__input"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
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

export default LoginModal;
