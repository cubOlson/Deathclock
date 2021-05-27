import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserThunk } from '../../store/user'
import { getNonFollowersThunk } from '../../store/follows'
import { getFriendClocksThunk } from '../../store/friendClocks'

import './SingleUser.css'

function SingleUser(props){
    const dispatch = useDispatch()
    const user = props.user;
    const currentUser = useSelector(state => state.session.user)

    const handleAddFollow = async (e) => {
        await dispatch(followUserThunk(user.id))
        dispatch(getNonFollowersThunk())
        dispatch(getFriendClocksThunk(currentUser.id))
    }

    return (
        <div className="singleUserBox">
            <div>
                <h2>{user.username}</h2>
                <p>{user.bio}</p>
            </div>
            <button onClick={e => handleAddFollow(e)}>Follow User</button>
        </div>
    )
}

export default SingleUser