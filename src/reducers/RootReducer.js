import { combineReducers } from 'redux'
import NotificationReducer from './NotificationReducer'
import UserReducer from './UserReducer'

const mainReducer = combineReducers({
    'user': UserReducer,
    'notification': NotificationReducer,
})

export default mainReducer