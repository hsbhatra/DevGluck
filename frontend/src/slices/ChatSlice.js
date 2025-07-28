import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';


const tokenParser = () => {
    // Token can be get from state in future
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = currentUser?.token;
    if (!token) {
        return thunkAPI.rejectWithValue("User not authenticated");
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return config;
}

export const listChat = createAsyncThunk(
    'chat/list',
    async (userId, thunkAPI) => {
        try {
            const config = tokenParser();
            const conversations = await axiosInstance.get('/messages', config);
            console.log(conversations);
            return conversations.data.conversations;
        } catch (error) {
            console.error("ChatSlice: listChat error:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getMessages = createAsyncThunk(
    'chat/getmsgs',
    async (recieverId, thunkAPI) => {
        try {
            const config = tokenParser();
            const response = await axiosInstance.get(`/messages/all/${recieverId}`, config);
            return response.data.messages;
        } catch (error) {
            console.error("ChatSlice: getMessages error:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


const handleChatList = (chatResponse) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    return chatResponse.map((chat) => {
        const check = chat?.participants[1]?._id === user?.user?._id;
        return {
            messages: chat?.latestMessage?.message || "new message",
            username: (check) ? chat?.participants[0]?.username : chat?.participants[1]?.username,
            recipientId: (check) ? chat?.participants[0]?._id : chat?.participants[1]?._id,
            avatar: chat?.participants[1]?.avatar,
        }
    });
}

const initialState = {
    chatResponse: [],
    loading: false,
    chatList: [],
    selectedChatMessages: [],
    onlineUsers: [],
    socket: null,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // actions
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        receiveNewMessages: (state, action) => {
            const newMsg = action.payload;

            const currentChat = state.selectedChatMessages;

            if (!currentChat.some(msg => msg._id === newMsg._id)) {
                state.selectedChatMessages.push(newMsg);
            }
        },
        createTempNewChat: (state, action) => {
            const update = { ...action.payload, messages: [] };
            console.log("UPDATE: ", update);
            state.chatList.push(update);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(listChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(listChat.fulfilled, (state, action) => {
                // localStorage.setItem('chatResponse', JSON.stringify(action.payload));
                state.chatResponse = action.payload;
                // localStorage.setItem('chatList', JSON.stringyfy(action.payload))
                state.chatList = handleChatList(action.payload);
                state.loading = false;
            })
            .addCase(listChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.payload.message;
            })
            .addCase(getMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                if (action.payload.length === 0) {

                }
                state.selectedChatMessages = action.payload;
                // localStorage.setItem('selectedChat', JSON.stringify(action.payload));
                state.loading = false;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.payload.message;
            });
    }
});
export const { setOnlineUsers, setMessages, receiveNewMessages, createTempNewChat } = chatSlice.actions;
export default chatSlice.reducer