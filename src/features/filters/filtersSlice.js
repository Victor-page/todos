export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
};

const initialFilters = { status: StatusFilters.All, colors: [] };

const filtersReducer = (state = initialFilters, action) => {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return { ...state, status: action.payload };
    }

    case 'filters/colorFilterChanged': {
      const { color, changeType } = action.payload;
      const { colors } = state;

      switch (changeType) {
        case 'added': {
          if (colors.includes(color)) {
            return state;
          }

          return { ...state, colors: state.colors.concat(color) };
        }

        case 'removed': {
          return {
            ...state,
            colors: state.colors.filter(
              (existingColor) => existingColor !== color
            ),
          };
        }

        default: {
          return state;
        }
      }
    }

    default: {
      return state;
    }
  }
};

export const colorFilterChanged = (color, changeType) => ({
  type: 'filters/colorFilterChanged',
  payload: { color, changeType },
});

export default filtersReducer;
