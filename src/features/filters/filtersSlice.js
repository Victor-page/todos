import { createSlice } from '@reduxjs/toolkit';

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
};

const initialState = { status: StatusFilters.All, colors: [] };

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, { payload }) {
      state.status = payload;
    },
    colorFilterChanged: {
      reducer(state, { payload }) {
        const { color, changeType } = payload;
        const { colors } = state;
        switch (changeType) {
          case 'added': {
            !colors.includes(color) && colors.push(color);
            break;
          }
          case 'removed': {
            state.colors = colors.filter(
              (existingColor) => existingColor !== color
            );
            break;
          }

          default:
            break;
        }
      },
      prepare: (color, changeType) => ({ payload: { color, changeType } }),
    },
  },
});

export const { statusFilterChanged, colorFilterChanged } = filtersSlice.actions;

export default filtersSlice.reducer;
