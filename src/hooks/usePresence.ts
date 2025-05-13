import { useEffect } from "react";
import { database } from "../firebase/config";
import { ref, set, onDisconnect, update, onValue } from "firebase/database";

const usePresence = (userId: string) => {
  useEffect(() => {
    if (!userId) return;

    const userStatusRef = ref(database, `users/${userId}`);

    // Set initial presence state
    const updatePresence = {
      online: true,
      lastActive: Date.now(),
    };

    // Set the user as online when they connect
    set(userStatusRef, updatePresence);

    // Set up presence monitoring to ensure connection is maintained
    const unsubscribe = onValue(userStatusRef, (snapshot) => {
      if (!snapshot.exists()) {
        set(userStatusRef, updatePresence);
      }
    });

    // Use onDisconnect to automatically set user offline when they disconnect
    onDisconnect(userStatusRef).update({
      online: false,
      lastActive: Date.now(),
    });

    return () => {
      unsubscribe();
      // Update status to offline when component unmounts
      update(userStatusRef, {
        online: false,
        lastActive: Date.now(),
      });
    };
  }, [userId]);
};

export default usePresence;
