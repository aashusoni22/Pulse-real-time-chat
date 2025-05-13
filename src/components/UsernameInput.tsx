import { useState } from "react";
import { motion } from "framer-motion";
import type { User } from "../types/chat";
import { v4 as uuidv4 } from "uuid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

type Props = {
  setUser: (user: User) => void;
};

const UsernameInput: React.FC<Props> = ({ setUser }) => {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = () => {
    if (username.trim()) {
      setUser({
        id: uuidv4(),
        username,
        lastActive: Date.now(),
        online: true,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          <ChatBubbleLeftEllipsisIcon className="w-8 h-8 inline" /> Pulse Chat
        </h1>

        <h2 className="text-lg text-white text-center">Enter your name</h2>

        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:border-accent outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Join Chat
        </button>
      </motion.div>
    </motion.div>
  );
};

export default UsernameInput;
