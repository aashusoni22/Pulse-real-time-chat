import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/config";

type OnlineStatusProps = {
  userId: string;
};

const OnlineStatus: React.FC<OnlineStatusProps> = ({ userId }) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean | null>(null);
  const [lastActive, setLastActive] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) return;

    const userRef = ref(database, `users/${userId}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setOnlineStatus(userData.online);
        setLastActive(userData.lastActive);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const getStatusColor = () => {
    if (onlineStatus === null) return "bg-gray-300"; // Loading state
    if (onlineStatus) return "bg-green-500"; // Online
    return "bg-gray-400"; // Offline
  };

  const getTitle = () => {
    if (onlineStatus === null) return "Loading...";
    if (onlineStatus) return "Online";
    if (lastActive) {
      const lastActiveDate = new Date(lastActive);
      return `Last active: ${lastActiveDate.toLocaleString()}`;
    }
    return "Offline";
  };

  return (
    <span
      className={`w-3 h-3 rounded-full inline-block mr-2 ${getStatusColor()}`}
      title={getTitle()}
    />
  );
};

export default OnlineStatus;
