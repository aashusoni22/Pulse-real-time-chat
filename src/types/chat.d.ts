export type Message = {
  id: string;
  username: string;
  message: string;
  timestamp: number;
};

export type User = {
  id: string;
  username: string;
  lastActive: number;
  online: boolean;
};

export type TypingStatus = {
  username: string;
  isTyping: boolean;
};
