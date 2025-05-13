import { useEffect, useState } from "react";
import { database } from "../firebase/config";
import { onValue, ref } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";

const TypingIndicator = () => {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const typingRef = ref(database, "typing");
    onValue(typingRef, (snapshot) => {
      const data = snapshot.val();
      const activeTypers = data
        ? Object.values(data).filter((value) => value !== null)
        : [];
      setTypingUsers(activeTypers as string[]);
    });
  }, []);

  if (typingUsers.length === 0) return null;

  return (
    <AnimatePresence>
      {typingUsers.length > 0 && (
        <motion.div
          key="typing-indicator"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-neutral-400 text-sm px-3 py-1"
        >
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
          typing...
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingIndicator;
