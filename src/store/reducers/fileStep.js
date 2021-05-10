import { SETRECIPIENT, SETSENDER } from '../constants/fileStep'

const INITIAL_STATE = {
  sender: {},
  recipient: [],
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETSENDER:
      return {
        ...state,
        sender: action.sender,
      }
    case SETRECIPIENT:
      return {
        ...state,
        recipient: action.recipient,
      }
    default:
      return state
  }
}
