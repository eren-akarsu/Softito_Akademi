import { createSlice } from "@reduxjs/toolkit";
import { selectArchivedTasks } from "../tasks/taskSlice";

const archiveSlice = createSlice({
  name: "archive",
  initialState: {},
  reducers: {},
});

// Authorized Archived Tasks Selector
export const selectArchivedTasksForUser = (state) => {
  const user = state.auth.currentUser;
  if (!user) return [];

  const archived = selectArchivedTasks(state);

  // Group boundary rule: users cannot see archived tasks from other groups
  const groupArchived = archived.filter((t) => t.groupId === user.groupId);

  if (user.role === "manager") {
    // Manager sees all archived tasks in their group
    return groupArchived.filter((t) => t.assignedByRole === "manager");
  } else if (user.role === "teamLeader") {
    // Team Leader sees archived tasks they assigned or were assigned to them
    return groupArchived.filter(
      (t) => t.assignedBy === user.id || t.assignedTo === user.id
    );
  } else if (user.role === "developer") {
    // Developer only sees archived tasks assigned to them
    return groupArchived.filter((t) => t.assignedTo === user.id);
  }
  return [];
};

export default archiveSlice.reducer;
