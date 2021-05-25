const GET_FOLLOWERS = "user/GET_FOLLOWERS"
const GET_NONFOLLOWERS = "user/GET_NONFOLLOWERS"

const getFollowers = (followers) => ({
    type: GET_FOLLOWERS,
    payload: followers
})

const getNonFollowers = (followers) => ({
    type: GET_NONFOLLOWERS,
    payload: followers
})

export const getAllFollowersThunk = () => async(dispatch) => {
    const response = await fetch('/api/users/')
    const data = await response.json()
    if (data.errors){
        return data
    }
    dispatch(getFollowers(data))
}

export const getNonFollowersThunk = () => async(dispatch) => {
    const response = await fetch('/api/users/notFollowing')
    const data = await response.json()
    if (data.errors){
        return data
    }
    dispatch(getNonFollowers(data))
}

const initialState = {}

export default function followersReducer (followers = initialState, action) {
    switch(action.type){
        case GET_FOLLOWERS:
            const followersPayload = action.payload;
            const newFollowers = {};
            for (const user of followersPayload.users) {
                newFollowers[user.id] = user
            }
            return newFollowers;
        case GET_NONFOLLOWERS:
            const nonfollowersPayload = action.payload;
            const newNonFollowers = {};
            for (const user of nonfollowersPayload.users) {
                newNonFollowers[user.id] = user
            }
            return newNonFollowers;
        default: 
            return followers
    }
}