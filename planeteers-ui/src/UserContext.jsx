import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

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
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token) {
      axios.get("/api/user/current", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        // Optionally update points if your API provides this information
        // setPlayerPoints(response.data.playerPoints || 0);
        // setGamePoints(response.data.gamePoints || 0);
      })
      .catch(() => {
        setUser(null);
        // localStorage.removeItem("token");
        // Cookies.remove("token");
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    Cookies.set("token", userData.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    // setPlayerPoints(userData.playerPoints || 0);
    // setGamePoints(userData.gamePoints || 0);
    // localStorage.setItem("playerPoints", userData.playerPoints || 0);
    // localStorage.setItem("gamePoints", userData.gamePoints || 0);
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem("token");
    // localStorage.removeItem("playerPoints");
    // localStorage.removeItem("gamePoints");

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
