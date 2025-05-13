# 💬 Pulse — Real-time Chat App

Pulse is a modern real-time chat application built with **React**, **TypeScript**, **Firebase**, and **Framer Motion**. It features online status indicators, typing notifications, smooth UI animations, and a responsive, dark-themed interface styled with **Tailwind CSS**.

### [✨ Live Demo](https://pulse-chat-six.vercel.app/) | [Source Code](https://github.com/aashusoni22/Pulse-real-time-chat)

<img src="https://github.com/user-attachments/assets/789fcf0d-e33c-4f0b-b41c-eb1002bfa487" alt="Pulse Chat App" width="600" />

## ✨ Features

- 🚀 Real-time messaging via Firebase Firestore
- 🎨 Clean, modern UI built with Tailwind CSS
- 💬 Typing indicators with live updates
- 🟢 Online status tracking
- 🌓 Dark mode-friendly design
- 🎛️ Smooth animations powered by Framer Motion
- 📱 Fully responsive and mobile-friendly layout
- 📦 Built with Vite for lightning-fast development

## 🔧 Tech Stack

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Firebase Firestore**
- **React Icons**
- **Custom Scrollbars**

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/aashusoni22/Pulse-real-time-chat
cd Pulse-real-time-chat

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 📝 Project Structure

```
src/
│
├── components/
│   ├── ChatWindow.tsx
│   ├── MessageList.tsx
|   ├── MessageItem.tsx
│   ├── MessageInput.tsx
│   ├── UsernameInput.tsx
|   ├── OnlineStatus.tsx
│   └── TypingIndicator.tsx
│
├── firebase/
│   └── config.ts
│
├── types/
│   └── chat.d.ts
|
├── hooks/
│   └── usePresence.ts
│
├── App.tsx
└── main.tsx
```

## 🌐 Deployment

Easily deploy to Netlify, Vercel, or any static hosting service:

```bash
npm run build
```

Then upload the `/dist` folder to your preferred platform.

## 📄 License

This project is licensed under the MIT License.

## 💖 Credits

Built with love by Aashutosh Soni.

## 🚀 Future Improvements

- ✅ Custom emoji picker
- ✅ Voice notes
- ✅ Read receipts
- ✅ Message reactions
- ✅ User profile pictures
- ✅ Group chats support
