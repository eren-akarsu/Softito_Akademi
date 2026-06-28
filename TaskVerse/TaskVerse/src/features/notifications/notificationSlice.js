import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNotificationThunk = createAsyncThunk(
  "notifications/addNotification",
  async (payload, { dispatch }) => {
    const { message, type, assignedTo } = payload;
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const newNotif = {
      id,
      message,
      type: type || "info",
      isRead: false,
      assignedTo: assignedTo || null,
      createdAt: new Date().toISOString(),
    };
    dispatch(addNotification(newNotif));
    return newNotif;
  }
);

export const removeNotificationThunk = createAsyncThunk(
  "notifications/removeNotification",
  async (id, { dispatch }) => {
    dispatch(removeNotification(id));
    return id;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setNotifications,
  addNotification,
  removeNotification,
  clearNotifications,
} = notificationSlice.actions;

export const selectNotifications = (state) => {
  const currentUser = state.auth.currentUser;
  if (currentUser) {
    return state.notifications.notifications.filter(
      (n) => !n.assignedTo || n.assignedTo === currentUser.id
    );
  }
  return state.notifications.notifications;
};

export default notificationSlice.reducer;
