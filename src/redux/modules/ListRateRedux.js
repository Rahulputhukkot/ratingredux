import { combineReducers } from 'redux';
import { createStore } from 'redux';

const ADD_DATA = 'ListRateRedux/ADD_DATA';
const Countervalue = 0;

const initialState = {
  count: Countervalue,
  ratings: [],
};

function adddata(state, action) {
  switch (action.type) {
    case ADD_DATA:
      return {
        count: action.count,
        ratings: action.ratings,
      };
    default:
      return state;
  }
}

export default function reducer(state = initialState, action = {}) {
  console.log('Data Added Successfully');
  console.log(action);
  console.log(state);
  switch (action.type) {
    case ADD_DATA:
      return [
        ...state,
        adddata(undefined, action),
      ];
    default:
      return state;
  }
}

export function load(dataTodispatch) {
  console.log('Inside load');
  console.log(dataTodispatch);
  const { dispatch } = this.props;
  dispatch({
    type: ADD_DATA,
    count: Countervalue + 1,
    dataTodispatch,
  });
  createStore(combineReducers(reducer));
}
