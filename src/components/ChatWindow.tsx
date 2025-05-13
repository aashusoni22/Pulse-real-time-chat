import { useState, useEffect } from "react";
import type { User } from "../types/chat";
import { motion } from "framer-motion";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import UsernameInput from "./UsernameInput";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import usePresence from "../hooks/usePresence";

const ChatWindow = () => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  usePresence(user?.id || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full max-w-2xl mx-auto p-4 gap-4 min-h-[600px] bg-slate-900 md:rounded-3xl shadow-xl border border-slate-800/50"
    >
      {" "}
      <div className="bg-slate-800 text-white px-6 py-4 rounded-lg shadow-lg mb-2">
        <h1 className="text-2xl font-bold">
          <ChatBubbleLeftEllipsisIcon className="w-8 h-8 inline" /> Pulse Chat
        </h1>
        <p className="text-sm opacity-80">
          Realtime messaging powered by Firebase
        </p>
      </div>
      {!user ? (
        <UsernameInput setUser={setUser} />
      ) : (
        <>
          <div className="flex-1 overflow-hidden">
            <MessageList user={user} />
          </div>
          <MessageInput user={user} />
        </>
      )}
    </motion.div>
  );
};

export default ChatWindow;
