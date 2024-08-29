import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';  // Ensure this is imported
import axios from 'axios';  // Ensure this is imported

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [playerPoints, setPlayerPoints] = useState(() => {
    return parseInt(localStorage.getItem("playerPoints")) || 0;
  });
  const [gamePoints, setGamePoints] = useState(() => {
    return parseInt(localStorage.getItem("gamePoints")) || 0;
  });

  useEffect(() => {
    // Retrieve user info from localStorage or cookies
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token) {
      axios
        .get("/api/user/current", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          // Handle error
          setUser(null);
        });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Save user info to localStorage and cookies
    localStorage.setItem("token", userData.token);
    Cookies.set("token", userData.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    Cookies.remove("token");
  };

  const updatePlayerPoints = (points) => {
    setPlayerPoints(prevPoints => {
      const newPoints = prevPoints + points;
      localStorage.setItem("playerPoints", newPoints);
      return newPoints;
    });
  };

  // Function to update game points
  const updateGamePoints = (points) => {
    setGamePoints(prevPoints => {
      const newPoints = prevPoints + points;
      localStorage.setItem("gamePoints", newPoints);
      return newPoints;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, playerPoints, gamePoints, updatePlayerPoints, updateGamePoints }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
