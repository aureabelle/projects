import { FETCH_CONTRIBUTORS } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CONTRIBUTORS:
      return [action.payload.data, ...state];
  }
  return state;
}