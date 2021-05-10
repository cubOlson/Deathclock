const GET_FRIEND_CLOCKS = "friendsClocks/GET_FRIEND_CLOCKS"

const getFriendClocks = (clocks) => ({
    type: GET_FRIEND_CLOCKS,
    payload: clocks
})

export const getFriendClocksThunk = () => async(dispatch) => {
    const response = await fetch(`/api/clock/`)
    const data = await response.json()
    if (data.errors){
        return data
    }
    dispatch(getFriendClocks(data))
}

const initialState = {}

export default function friendClockReducer (friendClock = initialState, action) {
    switch(action.type){
        case GET_FRIEND_CLOCKS:
            return action.payload
        default:
            return friendClock
    }
}