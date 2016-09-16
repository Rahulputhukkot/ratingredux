const LOAD = 'testReactRedux/load';
const LOAD_SUCCESS = 'testReactRedux/loadSuccess';
const LOAD_FAIL = 'testReactRedux/loadFail';

const initialState = {
  loaded: false,
  loading: false,
  data: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      console.log('LOAD called instantly');
      console.log(state);
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('LOAD_SUCCESS called after delay', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      console.log('LOAD_FAIL called after delay', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        data: action.error
      };
    default:
      return state;
  }
}

export function load(dataTodispatch) {
  console.log('entered dispatch');
  return (dispatch) => dispatch({
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => new Promise((resolve, reject) => {
      setTimeout(() => resolve(dataTodispatch), 3000);
      setTimeout(() => reject(dataTodispatch), 5000);
    })
  });
}
