import { createSlice } from "@reduxjs/toolkit";
import db from "../../data/taskverse-db-turkce-isimli.json";

const roleMeta = {
  manager: { title: "Yönetici", icon: "👔" },
  teamLeader: { title: "Takım Lideri", icon: "🧭" },
  developer: { title: "Geliştirici", icon: "💻" },
};

const initialUsers = db.users.map((u) => {
  const meta = roleMeta[u.role] || { title: "Üye", icon: "👤" };
  return {
    ...u,
    title: meta.title,
    icon: meta.icon,
  };
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: initialUsers,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.map((u) => {
        const meta = roleMeta[u.role] || { title: "Üye", icon: "👤" };
        return {
          ...u,
          title: meta.title,
          icon: meta.icon,
        };
      });
    },
  },
});

export const { setUsers } = userSlice.actions;

// Selectors
export const selectAllUsers = (state) => state.users.users;

export const selectUsersByGroup = (state, groupId) =>
  state.users.users.filter((u) => u.groupId === groupId);

export const selectManagers = (state) =>
  state.users.users.filter((u) => u.role === "manager");

export const selectTeamLeaders = (state) =>
  state.users.users.filter((u) => u.role === "teamLeader");

export const selectDevelopers = (state) =>
  state.users.users.filter((u) => u.role === "developer");

export const selectTeamLeadersByManagerGroup = (state, managerGroupId) =>
  state.users.users.filter(
    (u) => u.role === "teamLeader" && u.groupId === managerGroupId
  );

export const selectDevelopersByTeamLeaderGroup = (state, teamLeaderId) => {
  const users = state.users.users;
  const leader = users.find((u) => u.id === teamLeaderId);
  if (!leader) return [];
  return users.filter(
    (u) => u.role === "developer" && u.groupId === leader.groupId
  );
};

export default userSlice.reducer;
