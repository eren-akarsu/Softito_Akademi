import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification } from "../notifications/notificationSlice";

const channel = new BroadcastChannel("taskverse-tasks");

export const setupTaskSyncListener = () => (dispatch, getState) => {
  channel.onmessage = (event) => {
    const state = getState();
    const currentUser = state.auth.currentUser;

    if (event.data.type === "TASK_CREATED") {
      const task = event.data.payload;
      dispatch(addTaskFromSync(task));
      
      if (currentUser && task.assignedTo === currentUser.id) {
        dispatch(addNotification({
          id: Date.now().toString(),
          message: "Yeni bir görev aldınız.",
          type: "info",
          assignedTo: currentUser.id
        }));
      }
    } else if (event.data.type === "TASK_UPDATED") {
      dispatch(updateTaskFromSync(event.data.payload));
    } else if (event.data.type === "TASK_DELETED") {
      dispatch(deleteTaskFromSync(event.data.payload));
    } else if (event.data.type === "TASK_COMPLETED") {
      dispatch(completeTaskFromSync(event.data.payload));
    } else if (event.data.type === "TASK_ARCHIVED") {
      dispatch(archiveTaskFromSync(event.data.payload));
    } else if (event.data.type === "TASK_STATUS_CHANGED") {
      const payload = event.data.payload;
      dispatch(changeTaskStatusFromSync(payload));
    } else if (event.data.type === "CLEAR_ARCHIVE") {
      dispatch(clearArchiveFromSync(event.data.payload));
    }
  };
};

const notifyOtherTabs = (type, payload) => {
  channel.postMessage({ type, payload });
};

const getInitialTasks = () => {
  try {
    const saved = localStorage.getItem("taskverse_tasks");
    if (saved) {
      const parsed = JSON.parse(saved);
      const cleaned = parsed.filter((t) => !t.id.startsWith("task-init-"));
      localStorage.setItem("taskverse_tasks", JSON.stringify(cleaned));
      return cleaned;
    }
  } catch (e) {
    // Ignore read errors
  }
  return [];
};

export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const currentUser = state.auth.currentUser;
    if (!currentUser) return rejectWithValue("Kullanıcı girişi yapılmamış.");

    const { title, description, assignedTo, dueDate, priority, category } = taskData;
    
    // Strict schema validations
    if (!title || !title.trim()) return rejectWithValue("Görev başlığı boş olamaz.");
    if (!description || !description.trim()) return rejectWithValue("Görev açıklaması boş olamaz.");
    if (!assignedTo) return rejectWithValue("Atanacak kullanıcı seçilmeden görev gönderilemez.");
    if (currentUser.role === "developer") return rejectWithValue("Geliştirici görev oluşturamaz.");
    
    const allUsers = state.users.users;
    const assignee = allUsers.find(u => u.id === assignedTo);
    if (!assignee) return rejectWithValue("Atanacak personel sistemde bulunamadı.");
    if (assignee.groupId !== currentUser.groupId) return rejectWithValue("Farklı gruptaki bir kullanıcıya görev gönderilemez.");
    
    if (currentUser.role === "manager" && assignee.role !== "teamLeader") {
      return rejectWithValue("Yönetici sadece takım liderine görev gönderebilir.");
    }
    if (currentUser.role === "teamLeader" && assignee.role !== "developer") {
      return rejectWithValue("Takım lideri sadece geliştiriciye görev gönderebilir.");
    }

    const id = "task-" + Date.now();
    const newTask = {
      id,
      title,
      description,
      dueDate,
      priority: priority || "dusuk",
      category: category || "mülki",
      assignedBy: currentUser.id,
      assignedByRole: currentUser.role,
      assignedTo: assignee.id,
      assignedToRole: assignee.role,
      groupId: currentUser.groupId,
      status: "bekliyor",
      isArchived: false,
      feedback: "",
      rejectionReason: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch(addTask(newTask));
    notifyOtherTabs("TASK_CREATED", newTask);
    return newTask;
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async (payload, { dispatch }) => {
    dispatch(updateTask(payload));
    notifyOtherTabs("TASK_UPDATED", payload);
    return payload;
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { dispatch }) => {
    dispatch(deleteTask(taskId));
    notifyOtherTabs("TASK_DELETED", taskId);
    return taskId;
  }
);

export const completeTaskThunk = createAsyncThunk(
  "tasks/completeTask",
  async (taskId, { dispatch }) => {
    dispatch(completeTask(taskId));
    notifyOtherTabs("TASK_COMPLETED", taskId);
    return taskId;
  }
);

export const archiveTaskThunk = createAsyncThunk(
  "tasks/archiveTask",
  async (taskId, { dispatch }) => {
    dispatch(archiveTask(taskId));
    notifyOtherTabs("TASK_ARCHIVED", taskId);
    return taskId;
  }
);

export const changeTaskStatusThunk = createAsyncThunk(
  "tasks/changeTaskStatus",
  async (payload, { dispatch }) => {
    dispatch(changeTaskStatus(payload));
    notifyOtherTabs("TASK_STATUS_CHANGED", payload);
    return payload;
  }
);

export const clearArchiveThunk = createAsyncThunk(
  "tasks/clearArchive",
  async (_, { dispatch, getState }) => {
    const user = getState().auth.currentUser;
    if (user) {
      dispatch(clearArchive(user));
      notifyOtherTabs("CLEAR_ARCHIVE", user);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: getInitialTasks(),
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("taskverse_tasks", JSON.stringify(action.payload));
    },
    addTask: (state, action) => {
      const task = action.payload;
      state.tasks.unshift(task);
      localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
    },
    addTaskFromSync: (state, action) => {
      const task = action.payload;
      if (!state.tasks.find(t => t.id === task.id)) {
        state.tasks.unshift(task);
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action) => {
      const { id, ...fields } = action.payload;
      const existing = state.tasks.find((t) => t.id === id);
      if (existing) {
        Object.assign(existing, fields);
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    updateTaskFromSync: (state, action) => {
      const { id, ...fields } = action.payload;
      const existing = state.tasks.find((t) => t.id === id);
      if (existing) {
        Object.assign(existing, fields);
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      const existing = state.tasks.find((t) => t.id === taskId);
      if (existing) {
        existing.status = "iptal_edildi";
        existing.isArchived = true;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTaskFromSync: (state, action) => {
      const taskId = action.payload;
      const existing = state.tasks.find((t) => t.id === taskId);
      if (existing) {
        existing.status = "iptal_edildi";
        existing.isArchived = true;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    completeTask: (state, action) => {
      const taskId = action.payload;
      const existing = state.tasks.find((t) => t.id === taskId);
      if (existing) {
        existing.status = "onaylandi";
        existing.isArchived = true;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    completeTaskFromSync: (state, action) => {
      const taskId = action.payload;
      const existing = state.tasks.find((t) => t.id === taskId);
      if (existing) {
        existing.status = "onaylandi";
        existing.isArchived = true;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    archiveTask: (state, action) => {
      const taskId = action.payload;
      const existing = state.tasks.find((t) => t.id === taskId);
      if (existing) {
        existing.isArchived = true;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    archiveTaskFromSync: (state, action) => {
      const taskId = action.payload;
      const existing = state.tasks.find((t) => t.id === taskId);
      if (existing) {
        existing.isArchived = true;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    changeTaskStatus: (state, action) => {
      const { id, status, feedback, rejectionReason } = action.payload;
      const existing = state.tasks.find((t) => t.id === id);
      if (existing) {
        if (status !== undefined) existing.status = status;
        if (feedback !== undefined) existing.feedback = feedback;
        if (rejectionReason !== undefined) existing.rejectionReason = rejectionReason;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    changeTaskStatusFromSync: (state, action) => {
      const { id, status, feedback, rejectionReason } = action.payload;
      const existing = state.tasks.find((t) => t.id === id);
      if (existing) {
        if (status !== undefined) existing.status = status;
        if (feedback !== undefined) existing.feedback = feedback;
        if (rejectionReason !== undefined) existing.rejectionReason = rejectionReason;
        existing.updatedAt = new Date().toISOString();
        localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
      }
    },
    clearArchive: (state, action) => {
      const user = action.payload;
      // İlgili gruba ait tüm arşivlenmiş görevleri kalıcı olarak sil
      state.tasks = state.tasks.filter((t) => !(t.isArchived && t.groupId === user.groupId));
      localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
    },
    clearArchiveFromSync: (state, action) => {
      const user = action.payload;
      state.tasks = state.tasks.filter((t) => !(t.isArchived && t.groupId === user.groupId));
      localStorage.setItem("taskverse_tasks", JSON.stringify(state.tasks));
    },
  },
});

export const {
  setTasks,
  addTask,
  addTaskFromSync,
  updateTask,
  updateTaskFromSync,
  deleteTask,
  deleteTaskFromSync,
  completeTask,
  completeTaskFromSync,
  archiveTask,
  archiveTaskFromSync,
  changeTaskStatus,
  changeTaskStatusFromSync,
  clearArchive,
  clearArchiveFromSync,
} = taskSlice.actions;

// Selectors
export const selectActiveTasks = (state) =>
  state.tasks.tasks.filter((t) => !t.isArchived);

export const selectArchivedTasks = (state) =>
  state.tasks.tasks.filter((t) => t.isArchived);

export const selectTasksByGroup = (state, groupId) =>
  state.tasks.tasks.filter((t) => t.groupId === groupId && !t.isArchived);

export const selectTasksAssignedByUser = (state, userId) =>
  state.tasks.tasks.filter((t) => t.assignedBy === userId && !t.isArchived);

export const selectTasksAssignedToUser = (state, userId) =>
  state.tasks.tasks.filter((t) => t.assignedTo === userId && !t.isArchived);

export const selectTasksByCurrentUser = (state) => {
  const user = state.auth.currentUser;
  if (!user) return [];
  const active = state.tasks.tasks.filter((t) => !t.isArchived);

  const groupTasks = active.filter((t) => t.groupId === user.groupId);

  let userTasks = [];
  if (user.role === "manager") {
    userTasks = groupTasks.filter((t) => t.assignedByRole === "manager");
  } else if (user.role === "teamLeader") {
    userTasks = groupTasks.filter(
      (t) =>
        (t.assignedTo === user.id && t.assignedToRole === "teamLeader") ||
        (t.assignedBy === user.id && t.assignedToRole === "developer")
    );
  } else if (user.role === "developer") {
    userTasks = groupTasks.filter(
      (t) => t.assignedTo === user.id && t.assignedToRole === "developer"
    );
  }

  return userTasks.map((t) => {
    if (user.role === "teamLeader" && t.assignedTo === user.id && t.delegatedTaskId) {
      const child = state.tasks.tasks.find((c) => c.id === t.delegatedTaskId);
      if (child) {
        return {
          ...t,
          delegatedTaskStatus: child.status,
          delegatedTaskFeedback: child.feedback,
          delegatedTaskRejectionReason: child.rejectionReason,
        };
      }
    }
    return t;
  });
};

export default taskSlice.reducer;
