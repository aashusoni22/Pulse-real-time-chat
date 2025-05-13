import { useRef, useState } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase/config";
import type { Message, User } from "../types/chat";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type Props = {
  user: User;
};

const MessageInput: React.FC<Props> = ({ user }) => {
  const [message, setMessage] = useState<string>("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendMessage = () => {
    if (message.trim()) {
      const messageRef = ref(database, `messages/${Date.now()}`);
      const newMessage: Message = {
        id: user.id, // Use the user's ID instead of timestamp
        username: user.username,
        message,
        timestamp: Date.now(),
      };
      set(messageRef, newMessage);
      setMessage("");
      setTypingStatus(false);
    }
  };

  const setTypingStatus = (status: boolean) => {
    const typingRef = ref(database, `typing/${user.id}`);
    set(typingRef, status ? user.username : null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    setTypingStatus(true);

    // Clear existing timeout if user keeps typing
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout — stop typing after 2s of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setTypingStatus(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 items-center bg-slate-900 p-2 rounded-lg shadow-lg"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg outline-none border-2 border-slate-700 focus:border-slate-500 transition-all duration-200 placeholder:text-slate-500"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={sendMessage}
        className="bg-slate-600 text-white p-3 rounded-lg hover:bg-slate-500 transition-colors duration-200"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
};

export default MessageInput;
