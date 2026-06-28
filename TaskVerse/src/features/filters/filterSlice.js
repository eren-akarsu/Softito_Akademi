import { createSlice } from "@reduxjs/toolkit";

const initialFilters = {
  status: "all",
  priority: "all",
  assignedBy: "all",
  assignedTo: "all",
  dateRange: { start: "", end: "" },
  groupId: "all",
  role: "all",
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilters,
  reducers: {
    setFilter: (state, action) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => {
      return initialFilters;
    },
  },
});

export const { setFilter, setFilters, resetFilters } = filterSlice.actions;

export const selectFilters = (state) => state.filters;

export default filterSlice.reducer;
