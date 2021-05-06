const GET_USERS = "user/GET_USERS"
const FOLLOW_USER = "user/FOLLOW_USER"
const UNFOLLOW_USER = "user/UNFOLLOW_USER"

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

const followUser = () => ({
    type: FOLLOW_USER
})

const unfollowUser = () => ({
    type: UNFOLLOW_USER
})


export const getAllUsers = () => async(dispatch) => {
    const response = await fetch('/api/users/')
    const data = await response.json()
    if (data.errors){
        return data
    }
    dispatch(getUsers(data))
}

export const followUserThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/follow/${id}`)
    const data = await response.json()
    if (data.errors){
        return data
    }
    dispatch(followUser())
}

export const unfollowUserThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/unfollow/${id}`)
    const data = await response.json()
    if (data.errors){
        return data
    }
    dispatch(unfollowUser())
}

const initialState = { user: null }

export default function userReducer (users = initialState, action) {
    switch(action.type){
        case GET_USERS:
            const usersPayload = action.payload;
            const newUsers = {};
            for (const user of usersPayload.users) {
                newUsers[user.id] = user
            }
            return newUsers;
        case FOLLOW_USER:
            return users;
        case UNFOLLOW_USER:
            return users;
        default: 
            return users
    }
}