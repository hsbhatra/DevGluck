# Devester – Real-Time Social Media & Messaging Platform

**Devester** is a **full-stack social media and messaging app** for developers and tech enthusiasts. It combines **real-time chat**, **social blogging**, and **instant notifications** into a single platform.

---

## ✨ Features

- **💬 Real-Time Messaging**

  - Instant private chat using **Socket.IO**
  - Online/Offline indicators and real-time status updates
  - Unread message tracking

- **📰 Social Feed**

  - Create and view **developer-focused blogs**
  - Like, share, and interact with community content

- **🔔 Notifications**

  - Real-time notifications for **new messages**
  - Unread chat counter with notification dot on the **Messages icon**

- **📱 Responsive UI**
  - Modern **React + Tailwind CSS** interface
  - **Framer Motion animations** for smooth transitions
  - Mobile-friendly **navbar & chat layout**

---

## 🛠 Tech Stack

**Frontend:**  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/FramerMotion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Backend:**  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

**Authentication:** JWT  
**Database:** MongoDB with Mongoose ORM

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/devester.git
cd devester
```

### 2️⃣ Install Dependencies

```bash
# Install server dependencies
cd backend
npm install

# Install client dependencies
cd ../frontend
npm install
```

### 3️⃣ Setup Environment Variables

Create a **.env** file in `backend/` with the following keys:

```env
PORT=PORT_NO
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Run the Application

```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser 🚀

---

## 📸 Screenshots & Demo

| Login Page                                                   | Chat Page                                                  | Blog Feed                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------- |
| ![Login](https://via.placeholder.com/300x200.png?text=Login) | ![Chat](https://via.placeholder.com/300x200.png?text=Chat) | ![Feed](https://via.placeholder.com/300x200.png?text=Feed) |

---

## 📌 Roadmap

- ✅ Real-time messaging with Socket.IO
- ✅ Dynamic User Profile
- ✅ Blog posting & feed system
- ⬜ Push notifications for new messages
- ⬜ Group chats and channels
- ⬜ User-to-user video calls

---

## 🤝 Contributing

Contributions are welcome! Please **fork** this repo and submit a **pull request**.
