import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserThunk, unfollowUserThunk } from '../../store/user'
import { getNonFollowersThunk } from '../../store/follows'

import './SingleUser.css'

function SingleUser(props){
    const dispatch = useDispatch()
    const user = props.user;
    const currentUser = useSelector(state => state.session.user)

    const check = currentUser.followers.includes(user.id)

    const handleAddFollow = async (e) => {
        await dispatch(followUserThunk(user.id))
        await dispatch(getNonFollowersThunk())
        // window.location.reload()
    }

    const handleRemoveFollow = async (e) => {
        await dispatch(unfollowUserThunk(user.id))
        await dispatch(getNonFollowersThunk())
        // window.location.reload()
    }

    return (
        <div className="singleUserBox">
            <div>
                <h2>{user.username}</h2>
                <p>{user.bio}</p>
            </div>
            {!check ?
                <button onClick={e => handleAddFollow(e)}>Follow User</button>
            : <button onClick={e => handleRemoveFollow(e)}>Unfollow User</button>}
        </div>
    )
}

export default SingleUser