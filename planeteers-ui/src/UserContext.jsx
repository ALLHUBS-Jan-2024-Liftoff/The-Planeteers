import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [playerPoints, setPlayerPoints] = useState(() => parseInt(localStorage.getItem("playerPoints")) || 0);
  const [gamePoints, setGamePoints] = useState(() => parseInt(localStorage.getItem("gamePoints")) || 0);

  useEffect(() => {
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token) {
      axios.get("/api/user/current", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data);
          if (response.data.playerPoints) {
            setPlayerPoints(response.data.playerPoints);
            localStorage.setItem("playerPoints", response.data.playerPoints);
          }
          if (response.data.gamePoints) {
            setGamePoints(response.data.gamePoints);
            localStorage.setItem("gamePoints", response.data.gamePoints);
          }
        })
        .catch(() => setUser(null));
    }
  }, []);

  const syncPointsWithBackend = async () => {
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token && user) {
      try {
        await axios.post('/points/gamePoints/saveOrUpdate', { userId: user.id, gamePoint: gamePoints }, { headers: { Authorization: `Bearer ${token}` } });
        await axios.post('/points/playerPoints/saveOrUpdate', { userId: user.id, playerPoint: playerPoints }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.error("Error syncing points with backend:", error);
      }
    }
  };

  const updatePlayerPoints = (points) => {
    setPlayerPoints(prevPoints => {
      const newPoints = prevPoints + points;
      localStorage.setItem("playerPoints", newPoints);
      syncPointsWithBackend();
      return newPoints;
    });
  };

  const updateGamePoints = (points) => {
    setGamePoints(prevPoints => {
      const newPoints = prevPoints + points;
      localStorage.setItem("gamePoints", newPoints);
      syncPointsWithBackend();
      return newPoints;
    });
  };

  return (
    <UserContext.Provider value={{ user, playerPoints, gamePoints, updatePlayerPoints, updateGamePoints }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
