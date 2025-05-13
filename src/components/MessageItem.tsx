import type { Message, User } from "../types/chat";
import { motion } from "framer-motion";
import OnlineStatus from "./OnlineStatus";

type MessageProps = {
  messageData: Message;
  currentUser: User;
};

const MessageItem: React.FC<MessageProps> = ({ messageData, currentUser }) => {
  const isOwnMessage = messageData.username === currentUser.username;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      className={`group flex flex-col max-w-[60%] px-4 py-2 rounded-lg transition-all duration-200 ${
        isOwnMessage
          ? "ml-auto self-end bg-slate-600 text-white"
          : "self-start bg-slate-800 text-neutral-200"
      }`}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <OnlineStatus userId={messageData.id} />
          <span className="font-bold">{messageData.username}</span>
        </div>
        <span className="text-xs text-slate-400">
          {formatTime(messageData.timestamp)}
        </span>
      </div>
      <div className="text-sm leading-relaxed break-words">
        {messageData.message}
      </div>
    </motion.div>
  );
};

export default MessageItem;
