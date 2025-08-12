const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const checkResponseAllowEmpty = (res) => {
  if (!res.ok) return Promise.reject(`Error: ${res.status}`);
  if (res.status === 204) return null;
  const len = res.headers.get("content-length");
  if (len === "0") return null;

  return res.json().catch(() => null);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, { method: "DELETE" }).then(
    checkResponseAllowEmpty
  );
}

export { getItems, addItem, deleteItem };
