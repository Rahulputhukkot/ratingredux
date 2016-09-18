
const ADD = 'ListRateRedux/ADD';
const ADD_SUCCESS = 'ListRateRedux/ADD_SUCCESS';
const DEL = 'ListRateRedux/DEL';
const DEL_SUCCESS = 'ListRateRedux/DEL_SUCCESS';
const EDIT = 'ListRateRedux/EDIT';
const EDIT_SUCCESS = 'ListRateRedux/EDIT_SUCCESS';

const initialState = {
  count: 0,
  ratings: [],
};

export default function reducer(state = initialState, action = {}) {
  const { count } = state;
  const { ratings } = state;
  switch (action.type) {
    case ADD:
      return {
        ...state,
        count: count + 1,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        ratings: [
          ...state.ratings,
          action.result,
        ],
      };
    case DEL:
      return state;
    case DEL_SUCCESS:
      let newRatings = [];
      ratings.forEach(line => {
        if (line.timestamp !== action.result) {
          newRatings = newRatings.concat(line);
        }
      });
      return {
        count: count - 1,
        ratings: newRatings,
      };
    case EDIT:
      return state;
    case EDIT_SUCCESS:
      let newEditRatings = [];
      ratings.forEach(line => {
        if (line.timestamp !== action.result.oldtimestamp) {
          newEditRatings = newEditRatings.concat(line);
        } else {
          newEditRatings = newEditRatings.concat(action.result);
        }
      });
      return {
        count: count,
        ratings: newEditRatings,
      };
    default:
      return state;
  }
}

export function load(dataTodispatch) {
  return (dispatch) => dispatch({
    types: [ADD, ADD_SUCCESS],
    promise: () => new Promise((resolve) => {
      resolve(dataTodispatch);
    }),
  });
}

export function remove(dataToRemove) {
  return (dispatch) => dispatch({
    types: [DEL, DEL_SUCCESS],
    promise: () => new Promise((resolve) => {
      resolve(dataToRemove);
    }),
  });
}

export function edit(dataToEdit) {
  return (dispatch) => dispatch({
    types: [EDIT, EDIT_SUCCESS],
    promise: () => new Promise((resolve) => {
      resolve(dataToEdit);
    }),
  });
}
