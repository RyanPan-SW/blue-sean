import { combineReducers } from 'redux'
import { counter } from './counter'
import user from './user'
import fileStep from './fileStep'
import address from './address'

export default combineReducers({
  counter,
  user,
  fileStep,
  address,
})
