export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const loginEmail = (payload) => ({ type: ADD_EMAIL, payload });

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const receiveCurrencies = (currencies) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies,
});

function failedRequest(error) {
  return {
    type: FAILED_REQUEST,
    payload: error,
  };
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(receiveCurrencies(json)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
