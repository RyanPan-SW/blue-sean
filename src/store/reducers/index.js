import { combineReducers } from 'redux'
import { counter } from './counter'
import user from './user'
import fileStep from './fileStep'

export default combineReducers({
  counter,
  user,
  fileStep,
})
