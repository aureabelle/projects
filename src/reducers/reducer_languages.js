import { FETCH_LANGUAGES } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LANGUAGES:
      return [action.payload.data, ...state];
  }
  return state;
}