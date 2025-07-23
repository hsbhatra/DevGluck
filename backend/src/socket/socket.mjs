import { Server } from "socket.io";
import { createMessage } from "../utils/messageService.mjs";

const userSocketMap = {};
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

export let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("🟢 Socket connected:", socket.id);

        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} registered with socket ID: ${socket.id}`);
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // ✅ Real-time messaging using service layer
        socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
            console.log("📨 Message received on server:", message);

            try {
                const newMessage = await createMessage(senderId, receiverId, message);
                // emit to sender (to update UI instantly)
                console.log(socket.id, newMessage);
                io.to(socket.id).emit("receiveMessage", newMessage);
                // Emit to receiver if online
                const receiverSocketId = getReceiverSocketId(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", newMessage);
                }

                // Optionally, emit back to sender to update their own state
                socket.emit("messageSentAck", newMessage);

            } catch (error) {
                console.error("❌ Error saving message:", error.message);
                socket.emit("messageError", { error: "Message could not be sent." });
            }
        });

        socket.on("disconnect", () => {
            console.log("🔴 Socket disconnected:", socket.id);
            if (userId && userSocketMap[userId] === socket.id) {
                delete userSocketMap[userId];
            }
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};
