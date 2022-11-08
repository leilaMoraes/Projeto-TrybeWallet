import { REQUEST_CURRENCIES, RECEIVE_CURRENCIES,
  FAILED_REQUEST, ADD_EXPENSES, DELETE_EXPENSES, EDIT_EXPENSES } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: true };
  case RECEIVE_CURRENCIES:
    return { ...state,
      isLoading: false,
      currencies: Object.keys(action.payload),
      editor: false };
  case FAILED_REQUEST:
    return { ...state, error: action.payload, isLoading: false };
  case ADD_EXPENSES:
    return { ...state, editor: false, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSES:
    return { ...state, editor: false, expenses: action.payload };
  case EDIT_EXPENSES:
    return { ...state, editor: true, idToEdit: action.payload };
  default:
    return state;
  }
};

export default wallet;
