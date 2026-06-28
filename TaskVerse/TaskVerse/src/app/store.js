import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import groupReducer from "../features/groups/groupSlice";
import taskReducer from "../features/tasks/taskSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import archiveReducer from "../features/archive/archiveSlice";
import filterReducer from "../features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    groups: groupReducer,
    tasks: taskReducer,
    notifications: notificationReducer,
    archive: archiveReducer,
    filters: filterReducer,
  },
});
