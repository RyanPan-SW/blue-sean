import { ADD_DATA, EDIT_DATA } from '../constants/address'

export const AddCurrentData = (data) => ({ type: ADD_DATA, currentData: data })

export const EditCurrentData = (data) => ({ type: EDIT_DATA, currentData: data })
