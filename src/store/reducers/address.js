import { ADD_DATA, EDIT_DATA } from '../constants/address'

const INITIAL_STATE = {
  currentData: null,
}

export default function changeCurrentData(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        currentData: action.currentData,
      }
    case EDIT_DATA:
      return {
        ...state,
        currentData: action.currentData,
      }

    default:
      return state
  }
}
