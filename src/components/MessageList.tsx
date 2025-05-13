import { useEffect, useState, useRef } from "react";
import type { Message, User } from "../types/chat";
import { database } from "../firebase/config";
import { onValue, ref } from "firebase/database";
import MessageItem from "./MessageItem";
import { motion, AnimatePresence } from "framer-motion";
import TypingIndicator from "./TypingIndicator";

type Props = {
  user: User;
};

const MessageList: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Listen to messages from Firebase
  useEffect(() => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data
        ? Object.keys(data).map((key) => ({
            id: data[key].id, // Use the stored user ID
            username: data[key].username,
            message: data[key].message,
            timestamp: data[key].timestamp,
          }))
        : [];
      setMessages(messagesArray.sort((a, b) => a.timestamp - b.timestamp));
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] bg-slate-900 rounded-lg p-3"
    >
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MessageItem messageData={message} currentUser={user} />
          </motion.div>
        ))}
      </AnimatePresence>
      <TypingIndicator />
      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default MessageList;
