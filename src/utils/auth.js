const baseUrl = "http://localhost:3001";

const checkResponse = async (res) => {
  if (res.ok) return res.json();

  let message = `Error: ${res.status}`;
  try {
    const data = await res.json();
    if (data?.message) message = data.message;
  } catch (e) {
    // Keep fallback message when body is not JSON.
  }

  return Promise.reject(new Error(message));
};

export const register = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);

export const authorize = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

export const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export const updateProfile = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
