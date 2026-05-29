//External library imports
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Asset imports
import "./App.css";

//Internal component imports

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";

//Utility/API imports
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import {
  register,
  authorize,
  checkToken,
  updateProfile,
} from "../../utils/auth";

// Constants and configuration imports
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const navigate = useNavigate();

  const DEFAULT_AVATAR_URL =
    "https://api.dicebear.com/9.x/initials/svg?seed=WTWR";

  const normalizeItem = (item, fallbackLink = "") => ({
    _id: item._id,
    name: item.name,
    weather: item.weather,
    link: item.link ?? item.imageUrl ?? fallbackLink,
    owner: item.owner,
    likes: item.likes || [],
  });

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  //const [defaultClothingItems, setDefaultClothingItems] = useState([]);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("register");
  const handleEditProfileClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = ({ email, password }) => {
    return authorize({ email, password }).then((res) => {
      localStorage.setItem("jwt", res.token);
      return checkToken(res.token).then((user) => {
        setCurrentUser(user.data ?? user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
        return user;
      });
    });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    const avatarToUse = avatar?.trim() || DEFAULT_AVATAR_URL;

    return register({ name, avatar: avatarToUse, email, password }).then(() =>
      handleLogin({ email, password }),
    );
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return updateProfile({ name, avatar }, token).then((updatedUser) => {
      setCurrentUser(updatedUser.data ?? updatedUser);
      closeActiveModal();
    });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return Promise.reject(new Error("Authorization required"));
    }

    return addItem({ name, weather, imageUrl }).then((created) => {
      const newItem = created.data ?? created;
      const normalized = normalizeItem(newItem, imageUrl);
      setClothingItems((prev) => [normalized, ...prev]);
      closeActiveModal();
    });
  };

  const handleDeleteItem = (id) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    if (!id) return;

    deleteItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((it) => it._id !== id));
        closeActiveModal();
      })
      .catch((err) => console.error("Failed to delete item:", err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    const token = localStorage.getItem("jwt");
    const likeRequest = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    likeRequest
      .then((updatedCardResponse) => {
        const updatedCard = updatedCardResponse.data ?? updatedCardResponse;
        const normalized = normalizeItem(updatedCard);

        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? normalized : item)),
        );

        setSelectedCard((prev) => (prev?._id === id ? normalized : prev));
      })
      .catch((err) => console.error("Failed to update like:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((error) => console.error("Failed to fetch weather data:", error));
  }, []);

  useEffect(() => {
    getItems()
      .then((res) => {
        const items = Array.isArray(res) ? res : res?.data;
        if (!Array.isArray(items) || items.length === 0) return;
        const normalized = items.map((it, idx) =>
          normalizeItem({ ...it, _id: it._id ?? idx + 1 }),
        );
        setClothingItems(normalized.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthChecked(true);
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user.data ?? user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthChecked={isAuthChecked}
                  >
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
