import { SETRECIPIENT, SETSENDER } from '../constants/fileStep'

export const setSenderAction = () => ({ type: SETSENDER, sender: {} })

export const setRecipientAction = () => ({ type: SETRECIPIENT, recipient: {} })
