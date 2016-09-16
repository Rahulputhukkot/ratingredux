
const ADD = 'ListRateRedux/ADD';
const ADD_SUCCESS = 'ListRateRedux/ADD_SUCCESS';

const initialState = {
  count: 0,
  ratings: [],
};

export default function reducer(state = initialState, action = {}) {
  const {count} = state;
  switch (action.type) {
    case ADD:
      return {
        ...state,
        count: count + 1
      };
    case ADD_SUCCESS:
      return {
        ...state,
        ratings: [
          ...state.ratings,
          action.result
        ]
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
    })
  });
}
