

const NotificationReducer = (state=0, action) => {
    switch(action.type){
        case 'GET':
            return action.payload
    }
    return state
}

export default NotificationReducer